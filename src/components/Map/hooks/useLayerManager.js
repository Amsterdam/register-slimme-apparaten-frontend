/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';

import { categories, clusterCategories, DISPLAY_NAMES } from 'shared/configuration/categories';
import { getMarkerIcon } from 'services/marker';
import useHighlight from './useHighlight';

export const showInfo = (element, item, onClick, highlight) => {
  highlight(element);
  onClick(item);
};

const useLayerManager = map => {
  const [layerList, setLayerList] = useState({});
  const markerGroupRef = useRef(null);
  const layerGroupRef = useRef({});
  const { highlightMarker, highlightPolygon } = useHighlight();

  useEffect(() => {
    if (!map) return () => {};
    markerGroupRef.current = L.markerClusterGroup({
      disableClusteringAtZoom: 16,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: false,
    });

    map.addLayer(markerGroupRef.current);

    return () => {
      map.removeLayer(markerGroupRef.current);
    };
  }, [map]);

  const addPointClusterLayer = (markers, showInfoClick) => {
    if (!markers || !markerGroupRef.current) return;
    const clusterLayers = clusterCategories
      .map(([name]) => {
        if (layerList[name]) {
          markerGroupRef.current.removeLayers([layerList[name]]);
        }

        const layer = L.featureGroup();
        const filteredMarkers = markers.filter(marker => marker.category === name);
        if (filteredMarkers.length > 0) {
          const icon = getMarkerIcon(filteredMarkers[0].category);
          filteredMarkers.forEach(item =>
            L.marker([item.latitude, item.longitude], {
              icon,
            })
              .addTo(layer)
              .on('click', event => showInfo(event.sourceTarget, item, showInfoClick, highlightMarker)),
          );

          if (categories[name].enabled) markerGroupRef.current.addLayer(layer);
        }
        return { name, layer };
      })
      .reduce((acc, { name, layer }) => ({ ...acc, [name]: layer }), {});
    setLayerList({...layerList, ...clusterLayers})
  };

  const addPolygonLayer = (name, layerData, onClickCallback) => {
    const layer = L.Proj.geoJson(layerData, { className: 'camera-area' });
    layer.on('click', event =>
      showInfo(event.sourceTarget, event.sourceTarget.feature, onClickCallback, highlightPolygon),
    );
    if (map && categories[name].enabled) map.addLayer(layer);

    setLayerList({ ...layerList, [name]: layer})

    return () => {
      map.removeLayer(layer);
      setLayerList({ ...layerList, [name]: null });
    };
  };

  const toggleLayer = category => {
    categories[category].enabled = !categories[category].enabled;
    const layer = layerList[category];

    if (layer) {
      if (categories[category].isClustered) {
        if (categories[category].enabled) {
          markerGroupRef.current.addLayer(layer);
        } else {
          markerGroupRef.current.removeLayers([layer]);
        }
      } else if (categories[category].enabled) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    }

    if (layerGroupRef.current[category]) {
      layerGroupRef.current[category].forEach(name => {
        const privacyLayer = layerList[name];
        if (privacyLayer) {
          if (categories[category].enabled) {
            map.addLayer(privacyLayer);
          } else {
            map.removeLayer(privacyLayer);
          }
        }
      });
    }
  };

  return { addPointClusterLayer, addPolygonLayer, toggleLayer };
};

export default useLayerManager;
