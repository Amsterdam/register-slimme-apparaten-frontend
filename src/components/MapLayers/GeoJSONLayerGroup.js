import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GeoJSON } from '@datapunt/react-maps';
import layersReader from '../../services/layer-aggregator/layersReader';
import LAYERS_CONFIG, { getPointOptions } from '../../services/layer-aggregator/layersConfig';

const GeoJSONLayerGroup = ({ onItemSelected }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const results = await layersReader(LAYERS_CONFIG);
      const layers = results.reduce(
        (acc, { category, layer }) => ({
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
        }),
        {},
      );

      setData(layers);
    })();
    return () => {
      // removeLayerData('devices');
    };
  }, []);

  return Object.entries(data)?.map(
    ([name, value]) =>
      value.features.length && <GeoJSON args={[value]} options={getPointOptions(name, onItemSelected)} />,
  );
};

GeoJSONLayerGroup.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

export default GeoJSONLayerGroup;
