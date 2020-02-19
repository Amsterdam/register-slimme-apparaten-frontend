import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { GeoJSON } from '@datapunt/react-maps';
import { useDispatch, useSelector } from 'react-redux';
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

  const legend = useSelector(state => state?.map?.legend);
  const layers = useSelector(state => state?.map?.layers.filter(l => (layerNames.current.includes(l.name) &&state?.map?.legend[l.name])));
  useEffect(() => {
    const layerData = layers.reduce((acc, layer) => ({ ...acc, [layer.name]: layer }), {});
    setData(layerData)
  }, [legend]);

  useEffect(() => {
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
    })();
    return () => {
      dispatch(removeLayerDataActionCreator([...layerNames.current]));
    };
  }, []);

  return Object.entries(data)?.map(
    ([name, value]) =>
      value.features.length && <GeoJSON key={name} args={[value]} options={getPointOptions(name, onItemSelected)} />,
  );
};

GeoJSONLayerGroup.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

export default GeoJSONLayerGroup;
