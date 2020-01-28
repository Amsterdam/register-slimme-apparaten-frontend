/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
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

export const getMarkerCategory = device => categories[Object.keys(categories).find(mt => mt === device.categories[0])];

export const getMarkerIcon = categoryName => {
  const name = categoryName === 'Beacons' ? 'Baken' : categoryName;
  const iconUrl = categories[name].iconUrl;
  return L.icon({
    ...markerOptions,
    iconUrl,
  });
};

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
