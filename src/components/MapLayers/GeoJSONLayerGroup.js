import React, { useEffect, useState } from 'react';
import { GeoJSON } from '@datapunt/react-maps';
import layersReader from '../../services/layer-aggregator/layersReader';
import LAYERS_CONFIG, { LAYER_OPTIONS_CONFIG } from '../../services/layer-aggregator/layersConfig';

const GeoJSONLayerGroup = () => {
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

  return Object.entries(data)?.map(([name, value]) => (value.features.length &&
    <GeoJSON args={[value]} options={LAYER_OPTIONS_CONFIG[name].options} />
  ));
};

export default GeoJSONLayerGroup;
