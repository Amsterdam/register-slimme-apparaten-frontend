/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';

import { categories} from 'static/categories';
import { removeCurrentHighlight, HIGHLIGHT_CLASS , getMarkerIcon } from 'services/marker';
import useHighlight from './useHighlight';


let areaHighlightLayer;

export const showDeviceInfo = (event, marker, onClick, highlight) => {
  highlight(event);
  onClick(marker);
};

export const showAreaInfo = (event, map, onClick) => {
  removeCurrentHighlight(map);
  areaHighlightLayer = event.layer;

  const classList = areaHighlightLayer.getElement().classList;
  if (classList && classList.add) {
    classList.add(HIGHLIGHT_CLASS);
  }

  onClick(event.sourceTarget.feature);
};


const useMarkers = map => {
  const markerGroupRef = useRef(null);
  const layerListRef = useRef({});
  const layerGroupRef = useRef({});
  const highlight = useHighlight();

  const clusterCategories = useMemo(() => Object.entries(categories).filter(([, value]) => value.isClustered), []);


  useEffect(() => {
    markerGroupRef.current = L.markerClusterGroup({
      disableClusteringAtZoom: 16,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: false,
    });
    if (map) map.addLayer(markerGroupRef.current);
  }, [map]);

  const addMarkers = (markers, showInfoClick) => {
    if (!markers) return;
    for (const [name] of clusterCategories) {
      const layer = L.featureGroup();
      const filteredMarkers = markers.filter(marker => marker.category);
      filteredMarkers.forEach(marker => L.marker([marker.latitude, marker.longitude], {
        icon: getMarkerIcon(marker.category),
      })
        .addTo(layer)
        .on('click', event => showDeviceInfo(event, marker, showInfoClick, highlight))
      );

      layerListRef.current[name] = layer;
      categories[name].enabled = true;
      markerGroupRef.current.addLayer(layer);
    }
  };

  const addAreas = (name, areas, onClickCallback) => {
    const layer = L.Proj.geoJson(areas, { className: 'camera-area' });
    layer.on('click', event => showAreaInfo(event, map, onClickCallback));
    if (map) map.addLayer(layer);
    layerListRef.current[name] = layer;
    categories[name].enabled = true;
  };

  const toggleLayer = category => {
    categories[category].enabled = !categories[category].enabled;
    const layer = layerListRef.current[category];

    if (layer) {
      if (categories[category].isClustered) {
        if (categories[category].enabled) {
          markerGroupRef.current.addLayer(layer);
        } else {
          markerGroupRef.current.removeLayer(layer);
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

  return { addMarkers, addAreas, toggleLayer};
};

export default useMarkers;
