import React, { useEffect, useState } from 'react';
import { useMapInstance, GeoJSON } from '@datapunt/react-maps';
import { utils } from '@datapunt/amsterdam-react-maps';
import layersReader from '../../services/layer-aggregator/layersReader';

/**
 * This GeoJSONLayer can be used with any api, the data is requested only once and is
 * not dependent on zoom levels. Not to be used for large datasets because it can
 * impact the overall map performance
 */
const GeoJSONLayerWithConfig = ({name, options, config }) => {
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
      console.log('layer data', layerData);
      setJson(layerData);
      // addLayerData('devices', { type: 'FeatureCollection', name: 'devices', features });
    })();

    // const [request, controller] = fetchWithAbort(url)

    // request
    //   .then(res => res.json())
    //   .then(res => setJson(res))
    //   .catch(error => {
    //     // Ignore abort errors since they are expected to happen.
    //     if (error instanceof Error && error.name === 'AbortError') {
    //       return
    //     }

    //     return Promise.reject(error)
    //   })

    // return () => {
    //   controller.abort()
    // }
  }, [mapInstance]);

  return json ? <GeoJSON args={[json]} options={options} /> : null;
};

export default GeoJSONLayerWithConfig;
