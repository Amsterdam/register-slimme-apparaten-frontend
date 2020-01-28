/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';

import { categories, CATEGORY_NAMES } from '../static/categories';

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

function getMarkerIcon(categoryName) {
  const name = categoryName === 'Beacons' ? 'Baken' : categoryName;
  const iconUrl = categories[name].iconUrl;
  return L.icon({
    ...markerOptions,
    iconUrl,
  });
}

export const createFeatureMarker = (latlng, category) =>
  // Create a marker with the correct icon and onClick method
  L.marker(latlng, {
    icon: getMarkerIcon(category),
  });

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
  const layerGroupRef = useRef({});
  const highlight = useHighlight();

  useEffect(() => {
    markerGroupRef.current = L.markerClusterGroup({
      disableClusteringAtZoom: 8,
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

  const addPrivacyLayers = (layers, onClickCallback) => {
    layers.forEach(layerData => {
      const { name, layer, category } = layerData;

      if (!layerListRef.current[name]) {
        layerListRef.current[name] = L.Proj.geoJson(layer, {
          pointToLayer: (feature, latlng) => createFeatureMarker(latlng, category),
        });
        if (map) map.addLayer(layerListRef.current[name]);
      }

      const mapLayer = layerListRef.current[name];
      mapLayer.addData(layer);
      mapLayer.on('click', event => showAreaInfo(event, map, onClickCallback));
      layerGroupRef.current[category] = layerGroupRef.current[category] || [];
      layerGroupRef.current[category].push(name);
    });
  };

  return { addMarkers, addAreas, toggleLayer, addPrivacyLayers };
};
