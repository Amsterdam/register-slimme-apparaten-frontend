import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMapInstance, GeoJSON } from '@datapunt/react-maps';
import layersReader from '../../services/layer-aggregator/layersReader';

const GeoJSONLayerWithConfig = ({ name, options, config }) => {
  const mapInstance = useMapInstance();
  const [json, setJson] = useState();

  useEffect(() => {
    if (!mapInstance) {
      return;
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
      // addLayerData('devices', { type: 'FeatureCollection', name: 'devices', features });
    })();

    // return () => {
    //   // remove layer data
    // };
  }, [mapInstance]);

  return json ? <GeoJSON args={[json]} options={options} /> : null;
};

GeoJSONLayerWithConfig.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.shape({}).isRequired,
  config: PropTypes.shape({}).isRequired,
};

export default GeoJSONLayerWithConfig;
