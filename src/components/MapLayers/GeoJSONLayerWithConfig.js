import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMapInstance, GeoJSON } from '@datapunt/react-maps';
import { useDispatch } from 'react-redux';
import layersReader from '../../services/layer-aggregator/layersReader';
// import {
//   addLayerDataActionCreator,
//   removeLayerDataActionCreator,
// } from '../../containers/MapContainer/MapContainerDucks';

const GeoJSONLayerWithConfig = ({ name, options, config }) => {
  const mapInstance = useMapInstance();
  const [json, setJson] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mapInstance) {
      return () => { };
    }

    (async () => {
      const results = await layersReader(config);
      const features = results.reduce((acc, { layer }) => [...acc, ...layer.features], []);
      const layerData = {
        type: 'FeatureCollection',
        name,
        crs: {
          type: 'name',
          properties: {
            name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
          },
        },
        features,
      };
      setJson(layerData);
      // dispatch(addLayerDataActionCreator('cameras', { type: 'FeatureCollection', name: 'cameras', features }));
    })();

    return () => {
      // dispatch(removeLayerDataActionCreator('cameras'));
    };
  }, [mapInstance]);

  return json ? <GeoJSON args={[json]} options={options} /> : null;
};

GeoJSONLayerWithConfig.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.shape({}).isRequired,
  config: PropTypes.shape({}).isRequired,
};

export default GeoJSONLayerWithConfig;
