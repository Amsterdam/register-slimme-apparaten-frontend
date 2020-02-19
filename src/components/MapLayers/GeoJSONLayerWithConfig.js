import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMapInstance, GeoJSON } from '@datapunt/react-maps';
import { useDispatch, useSelector } from 'react-redux';
import layersReader from '../../services/layer-aggregator/layersReader';
import {
  addLayerDataActionCreator,
  removeLayerDataActionCreator,
} from '../../containers/MapContainer/MapContainerDucks';
import { CATEGORY_NAMES } from '../../shared/configuration/categories';

const GeoJSONLayerWithConfig = ({ options, config }) => {
  const mapInstance = useMapInstance();
  const [json, setJson] = useState();
  const dispatch = useDispatch();
  const layerName = useRef()

  const legend = useSelector(state => state?.map?.legend);
  const layer = useSelector(state => state?.map?.layers.filter(l => l.name === layerName.current && state?.map?.legend[l.name]));

  useEffect(() => {
    setJson(layer[0])
  }, [legend])


  useEffect(() => {
    if (!mapInstance) {
      return () => { };
    }

    (async () => {
      const results = await layersReader(config);
      const features = results.reduce((acc, { layer }) => [...acc, ...layer.features], []);
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
      layerName.current=layerData.name;
      dispatch(addLayerDataActionCreator([layerData]));
    })();

    return () => {
      dispatch(removeLayerDataActionCreator([layerName.current]));
    };
  }, [mapInstance]);

  return json ? <GeoJSON args={[json]} options={options} /> : null;
};

GeoJSONLayerWithConfig.propTypes = {
  options: PropTypes.shape({}).isRequired,
  config: PropTypes.array.isRequired,
};

export default GeoJSONLayerWithConfig;
