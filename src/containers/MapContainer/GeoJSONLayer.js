import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMapInstance, GeoJSON } from '@datapunt/react-maps';
import { utils } from '@datapunt/amsterdam-react-maps';

const { fetchWithAbort } = utils;
/**
 * This GeoJSONLayer can be used with any api, the data is requested only once and is
 * not dependent on zoom levels. Not to be used for large datasets because it can
 * impact the overall map performance
 */
const GeoJSONLayer = ({ url, options }) => {
  const mapInstance = useMapInstance();
  const [json, setJson] = useState();
  useEffect(() => {
    if (!mapInstance) {
      return () => {};
    }
    const [request, controller] = fetchWithAbort(url);

    request
      .then(res => res.json())
      .then(res => {
        setJson(res);
      })
      .catch(error => {
        // Ignore abort errors since they are expected to happen.
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        // eslint-disable-next-line consistent-return
        return Promise.reject(error);
      });

    return () => {
      controller.abort();
    };
  }, [mapInstance]);

  return json ? <GeoJSON args={[json]} options={options} /> : null;
};

GeoJSONLayer.propTypes = {
  url: PropTypes.string.isRequired,
  options: PropTypes.shape({}).isRequired,
};

export default GeoJSONLayer;
