import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMapInstance, GeoJSON } from '@datapunt/react-maps';
import { useDispatch, useSelector } from 'react-redux';
import layersReader from 'services/layer-aggregator/layersReader';
import { CATEGORY_NAMES } from 'shared/configuration/categories';
import { addLayerDataActionCreator, removeLayerDataActionCreator, MapState } from './MapContainerDucks';

interface MapLayerProps {
  options: any;
  config: any;
}

const MapLayer: React.FC<MapLayerProps> = ({ options, config }) => {
  const mapInstance = useMapInstance();
  const [json, setJson] = useState();
  const dispatch = useDispatch();
  const layerName = useRef<string | undefined>();

  const legend = useSelector((state: { map: MapState }) => state?.map?.legend);
  const layer = useSelector((state: { map: MapState }) =>
    state?.map?.layers.filter(l => l.name === layerName.current && state?.map?.legend[l.name]),
  );

  useEffect(() => {
    setJson(layer[0]);
  }, [legend]);

  useEffect(() => {
    if (!mapInstance) {
      return () => {};
    }

    (async () => {
      const results: any[] = await layersReader(config);
      const features = results.reduce((acc, { layer: l }) => [...acc, ...l.features], []);
      const layerData = {
        type: 'FeatureCollection',
        name: CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED,
        crs: {
          type: 'name',
          properties: {
            name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
          },
        },
        features,
      };
      setJson(layerData);
      layerName.current = layerData.name;
      dispatch(addLayerDataActionCreator([layerData]));
    })();

    return () => {
      layerName.current && dispatch(removeLayerDataActionCreator([layerName.current]));
    };
  }, [mapInstance]);

  return json ? <GeoJSON args={[json]} options={options} /> : null;
};

MapLayer.propTypes = {
  options: PropTypes.shape({}).isRequired,
  config: PropTypes.array.isRequired,
};

export default MapLayer;
