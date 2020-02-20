import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { GeoJSON, useMapInstance } from '@datapunt/react-maps';
import { useDispatch, useSelector } from 'react-redux';
import queryStringParser from 'shared/services/auth/services/query-string-parser/query-string-parser';
import layersReader from '../../services/layer-aggregator/layersReader';
import LAYERS_CONFIG, { getPointOptions } from '../../services/layer-aggregator/layersConfig';
import {
  addLayerDataActionCreator,
  removeLayerDataActionCreator,
} from '../../containers/MapContainer/MapContainerDucks';

const GeoJSONLayerGroup = ({ onItemSelected }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const layerNames = useRef([]);
  const mapInstance = useMapInstance();


  const legend = useSelector(state => state?.map?.legend);
  const layers = useSelector(state => state?.map?.layers.filter(l => (layerNames.current.includes(l.name) &&state?.map?.legend[l.name])));

  const udpateSelection = () => {
    const { id, source } = queryStringParser(location.search);
    mapInstance.eachLayer(f => {
      const isMarker = !f.getBounds;
      if(!f.feature) return;
      const featureId = String(isMarker ? f.feature.id : f.feature.properties.id);
      const zoom = isMarker ? 16 : 14;
      if (featureId === id && source === f.feature.contact) {
        const element = isMarker ? f._icon : f.getElement();

        const bounds = isMarker ? [f.getLatLng(), f.getLatLng()] : f.getBounds();
        mapInstance.fitBounds(bounds);
        mapInstance.setZoom(zoom);
        onItemSelected('devices', f.feature, element);
      }
    });
  };

  useEffect(() => {
    const layerData = layers.reduce((acc, layer) => ({ ...acc, [layer.name]: layer }), {});
    setData(layerData)
  }, [legend]);

  useEffect(() => {
    if (!mapInstance) return () => { };
    (async () => {
      const results = await layersReader(LAYERS_CONFIG);
      const layerData = results.reduce(
        (acc, { category, layer }) =>
          layer.features.length
            ? {
              ...acc,
              [category]: {
                type: 'FeatureCollection',
                name: category,
                crs: {
                  type: 'name',
                  properties: {
                    name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
                  },
                },
                ...acc[category],
                features: [...(acc[category]?.features || []), ...layer.features],
              },
            }
            : acc,
        {},
      );

      setData(layerData);
      layerNames.current = [...Object.keys(layerData)];
      dispatch(addLayerDataActionCreator([...Object.values(layerData)]));
      udpateSelection(mapInstance);
    })();
    return () => {
      dispatch(removeLayerDataActionCreator([...layerNames.current]));
    };
  }, [mapInstance]);

  return Object.entries(data)?.map(
    ([name, value]) =>
      value.features.length && <GeoJSON key={name} args={[value]} options={getPointOptions(name, onItemSelected)} />,
  );
};

GeoJSONLayerGroup.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

export default GeoJSONLayerGroup;
