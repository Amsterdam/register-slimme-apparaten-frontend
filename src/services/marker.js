/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import L from 'leaflet';
import 'leaflet.markercluster';

import { categories } from '../static/categories';

const markerOptions = {
  iconSize: [23, 23],
  iconAnchor: [8, 15],
  popupAnchor: [-3, -76],
};

export const getMarkerCategory = device => categories[Object.keys(categories).find(mt => mt === device.categories[0])];

export const getMarkerIcon = categoryName => {
  const name = categoryName === 'Beacons' ? 'Baken' : categoryName;
  const iconUrl = categories[name].iconUrl;
  return L.icon({
    ...markerOptions,
    iconUrl,
  });
};

