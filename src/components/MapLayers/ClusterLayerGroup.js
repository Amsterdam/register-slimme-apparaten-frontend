import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMapInstance, createLeafletComponent } from '@datapunt/react-maps';
import { useDispatch, useSelector } from 'react-redux';
import queryStringParser from 'shared/services/auth/services/query-string-parser/query-string-parser';
import layersReader from '../../services/layer-aggregator/layersReader';
import LAYERS_CONFIG, { getPointOptions } from '../../services/layer-aggregator/layersConfig';
import {
  addLayerDataActionCreator,
  removeLayerDataActionCreator,
} from '../../containers/MapContainer/MapContainerDucks';

const MarkerClusterGroup = createLeafletComponent('markerClusterGroup');

const clusterGroupOptions = {
  disableClusteringAtZoom: 16,
  showCoverageOnHover: false,
  spiderfyOnMaxZoom: false,
};

const ClusterLayerGroup = ({ onItemSelected }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const layerNames = useRef([]);
  const mapInstance = useMapInstance();
  const [layerInstance, setLayerInstance] = useState();

  const legend = useSelector(state => state?.map?.legend);
  const layers = useSelector(state =>
    state?.map?.layers.filter(l => layerNames.current.includes(l.name) && state?.map?.legend[l.name]),
  );

  const udpateSelection = () => {
    const { id, source } = queryStringParser(location.search);
    mapInstance.eachLayer(f => {
      const isMarker = !f.getBounds;
      if (!f.feature) return;
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
    if (layerInstance) {
      layerInstance.clearLayers()
      Object.entries(data)?.forEach(
        ([name, value]) => {
          // This will be moved in the react syntax
          const layer = L.geoJSON(value, getPointOptions(name, onItemSelected));
          layerInstance.addLayer( layer)
        }
      );
    }
  }, [layerInstance, data]);

  useEffect(() => {
    const layerData = layers.reduce((acc, layer) => ({ ...acc, [layer.name]: layer }), {});
    setData(layerData);
  }, [legend]);

  useEffect(() => {
    if (!mapInstance) return () => {};
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

  return (
    (
      <MarkerClusterGroup
        setInstance={setLayerInstance}
        options={clusterGroupOptions}
      />
    ) || null
  );
};

ClusterLayerGroup.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

export default ClusterLayerGroup;
