/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';

import { categories, clusterCategories, CATEGORY_NAMES } from 'shared/configuration/categories';
import { getMarkerIcon } from 'services/marker';
import useHighlight from './useHighlight';

export const showInfo = (element, item, onClick, highlight) => {
  highlight(element);
  onClick(item);
};

const useLayerManager = map => {
  const layerListRef = useRef({});
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
    const clusterLayers = clusterCategories.map(([name]) => {
      if (layerListRef.current[name]) {
        markerGroupRef.current.removeLayers([layerListRef.current[name]]);
      }

      const layer = L.featureGroup();
      const filteredMarkers = markers.filter(marker => marker.category === name);
      if (filteredMarkers.length > 0) {
        const icon = getMarkerIcon(filteredMarkers[0].category);
        filteredMarkers.forEach(item => {
          const marker = L.marker([item.latitude, item.longitude], {
            icon,
          });
          marker.feature = item;
          marker.addTo(layer).on('click', event => showInfo(event.sourceTarget, item, showInfoClick, highlightMarker));
        });

        if (categories[name].enabled) markerGroupRef.current.addLayer(layer);
        layerListRef.current[name] = layer;
      }
      return { name, layer };
    });
  };

  const selectFeature = (id, category, showInfoClick) => {
    const layer = layerListRef.current && layerListRef.current[category];
    if (!layer) return;
    layer.eachLayer(f => {
      if (String(f.feature.properties.id) === id) {
        const isMarker = !f.getBounds;
        const highlight = isMarker ? highlightMarker : highlightPolygon;
        const bounds = isMarker ? L.latLngBounds([f.getLatLng()]): f.getBounds();
        map.fitBounds(bounds);
        map.setZoom(14);
        showInfo(f, f.feature, showInfoClick, highlight);
      }
    });
  };

  const addPolygonLayer = (name, layerData, onClickCallback) => {
    const layer = L.Proj.geoJson(layerData, { className: 'camera-area' });
    layer.on('click', event => showInfo(event.sourceTarget, event.sourceTarget.feature, onClickCallback, highlightPolygon));
    if (map && categories[name].enabled) map.addLayer(layer);

    layerListRef.current[name] = layer;
  };

  const removeClusterPointLayer = () => {
    Object.entries(layerListRef.current)
      .filter(([name]) => name !== CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED)
      .reduce((acc, [name, layer]) => {
        map.removeLayer(layer);
        layerListRef.current[name] = null;

        return {
          ...acc,
          [name]: null,
        };
      }, {});
  };

  const removePolygonLayer = () => {
    const name = CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED;
    const layer = layerListRef[name];
    if (layer) map.removeLayer(layerListRef[name]);
    layerListRef.current[name] = null;
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

    if (layerGroupRef.current[category]) {
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
    }
  };

  return {
    addPointClusterLayer,
    addPolygonLayer,
    toggleLayer,
    removeClusterPointLayer,
    removePolygonLayer,
    selectFeature,
  };
};

export default useLayerManager;
