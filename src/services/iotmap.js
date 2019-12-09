/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';

import { categories } from '../static/categories';

// Import marker icons so Webpack adds them as separate files instead of inlining them
import '../../public/images/icon-camera-gebied@3x.png';
import '../../public/images/icon-camera@3x.png';
import '../../public/images/icon-beacon@3x.png';
import '../../public/images/icon-sensor@3x.png';
import '../../public/images/icon-laadpaal@3x.png';
import '../../public/images/icon-verkeer@3x.png';
import '../../public/images/icon-lantaarn@3x.png';

const markerOptions = {
  iconSize: [23, 23],
  iconAnchor: [8, 15],
  popupAnchor: [-3, -76],
};

export const HIGHLIGHT_CLASS = 'active-element';

let markerHighlight;
let areaHighlightLayer;

export function getMarkerCategory(device) {
  return categories[Object.keys(categories).find(mt => mt === device.categories[0])];
}

function getMarkerIcon(marker) {
  const iconUrl = categories[marker.categories[0]].iconUrl;
  return L.icon({
    ...markerOptions,
    iconUrl,
  });
}

export const removeCurrentHighlight = map => {
  if (markerHighlight) {
    // Point highlight
    map.removeLayer(markerHighlight);
  }

  if (areaHighlightLayer) {
    const classList = areaHighlightLayer.getElement().classList;
    if (classList && classList.remove) {
      classList.remove(HIGHLIGHT_CLASS);
    }
  }
};

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

const clusterCategories = Object.entries(categories).filter(([, value]) => value.isClustered);

const useHighlight = () => {
  const [activeMarker, setActiveMarker] = useState();

  const highlight = ({ sourceTarget }) => {
    if (activeMarker) {
      activeMarker._icon.classList.remove('highlight');
    }

    setActiveMarker(sourceTarget);
  };

  useEffect(() => {
    if (activeMarker) activeMarker._icon.classList.add('highlight');
  }, [activeMarker]);

  return highlight;
};

export const useMarkers = map => {
  const markerGroupRef = useRef(null);
  const layerListRef = useRef({});
  const highlight = useHighlight();

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
      const filteredMarkers = markers.filter(marker => marker.categories[0] === name);
      filteredMarkers.forEach(marker =>
        L.marker([marker.latitude, marker.longitude], {
          icon: getMarkerIcon(marker),
        })
          .addTo(layer)
          .on('click', event => showDeviceInfo(event, marker, showInfoClick, highlight)),
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

  const toggleLayer = name => {
    categories[name].enabled = !categories[name].enabled;
    const layer = layerListRef.current[name];

    if (layer) {
      if (categories[name].isClustered) {
        if (categories[name].enabled) {
          markerGroupRef.current.addLayer(layer);
        } else {
          markerGroupRef.current.removeLayer(layer);
        }
      } else if (categories[name].enabled) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    }
  };

  return { addMarkers, addAreas, toggleLayer };
};
