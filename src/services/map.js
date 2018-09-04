import L from 'leaflet';

import { rd } from '../services/geojson';

/**
 * Returns a Leaflet map for Amsterdam
 * @param el
 * @returns {*}
 */
export function amsMap(el) {
  const map = L.map(el, {
    crs: rd,
    attributionControl: false,
    zoomControl: true,
    scrollWheelZoom: false
  });

  mapHome(map);
  map.addLayer(tileLayer());
  return map;
}

export function mapHome(map) {
  map.setView([52.375, 4.9], 8);
}

export function mapGo(map, lat, lon, zoom = 10) {
  map.setView([lat, lon], zoom);
}

/**
 * Returns a tile layer for Amsterdam
 * This tyle layer can be used to show a given shape on the map of Amsterdam
 * @returns {*}
 */
function tileLayer() {
  return L.tileLayer(
    'https://t1.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png',
    {
      tms: true,
      minZoom: 7,
      maxZoom: 16,
      opacity: 0.8
    }
  );
}
