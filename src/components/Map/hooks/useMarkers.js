/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';

import { categories } from 'shared/configuration/categories';
import { getMarkerIcon } from 'services/marker';
import useHighlight from './useHighlight';

export const showDeviceInfo = (event, marker, onClick, highlight) => {
  highlight(event.sourceTarget);
  onClick(marker);
};

export const showAreaInfo = (event, onClick, highlight) => {
  highlight(event.layer)
  onClick(event.sourceTarget.feature);
};

const useMarkers = map => {
  const markerGroupRef = useRef(null);
  const layerListRef = useRef({});
  const layerGroupRef = useRef({});
  const { highlightMarker, highlightPolygon } = useHighlight();

  const clusterCategories = useMemo(() => Object.entries(categories).filter(([, value]) => value.isClustered), []);

  useEffect(() => {
    markerGroupRef.current = L.markerClusterGroup({
      disableClusteringAtZoom: 16,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: false,
    });
    if (map) {
      map.addLayer(markerGroupRef.current);
    }

    return () => {
      if (map) {
        map.removeLayer(markerGroupRef.current);
      }
    };
  }, [map]);

  const addMarkers = (markers, showInfoClick) => {
    if (!markers) return;
    for (const [name] of clusterCategories) {
      if (layerListRef.current[name]) {
        markerGroupRef.current.removeLayers([layerListRef.current[name]]);
      }

      const layer = L.featureGroup();
      const filteredMarkers = markers.filter(marker => marker.category === name);
      if (filteredMarkers.length > 0) {
        const icon = getMarkerIcon(filteredMarkers[0].category);
        filteredMarkers.forEach(marker =>
          L.marker([marker.latitude, marker.longitude], {
            icon,
          })
            .addTo(layer)
            .on('click', event => showDeviceInfo(event, marker, showInfoClick, highlightMarker)),
        );

        layerListRef.current[name] = layer;
        if (categories[name].enabled) markerGroupRef.current.addLayer(layer);
      }
    }
  };

  const addAreas = (name, areas, onClickCallback) => {
    const layer = L.Proj.geoJson(areas, { className: 'camera-area' });
    layer.on('click', event => showAreaInfo(event, onClickCallback, highlightPolygon));
    if (map && categories[name].enabled)
      map.addLayer(layer);
    layerListRef.current[name] = layer;
  };

  const toggleLayer = category => {
    categories[category].enabled = !categories[category].enabled;
    const layer = layerListRef.current[category];

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

    if (layerGroupRef.current[category])
      layerGroupRef.current[category].forEach(name => {
        const privacyLayer = layerListRef.current[name];
        if (privacyLayer) {
          if (categories[category].enabled) {
            map.addLayer(privacyLayer);
          } else {
            map.removeLayer(privacyLayer);
          }
        }
      });
  };

  return { addMarkers, addAreas, toggleLayer };
};

export default useMarkers;
