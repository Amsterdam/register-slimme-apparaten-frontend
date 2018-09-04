/* eslint-disable */

import L from 'leaflet';
import 'leaflet.markercluster';

import { mapHome, mapGo } from './map';

/* eslint-disable no-unused-vars */
// Import marker icons so Webpack adds them as separate files instead of inlining them
import Camera from '../../public/images/icon-camera@3x.png';
import Beacon from '../../public/images/icon-beacon@3x.png';
import Sensor from '../../public/images/icon-3d-sensor@3x.png';
import Wifi from '../../public/images/icon-wifi@3x.png';
import Tel from '../../public/images/icon-tel@3x.png';
/* eslint-enable no-unused-vars */

const ICON_PATH = 'assets/';

const markerOptions = {
  iconSize: [16, 16],
  iconAnchor: [8, 15],
  popupAnchor: [-3, -76]
};

const markerCategories = {
  'Camera': { // eslint-disable-line quote-props
    id: 'Camera',
    iconUrl: `${ICON_PATH}icon-camera@3x.png`,
    name: 'Camera',
    enabled: true
  },
  'Beacon': { // eslint-disable-line quote-props
    id: 'Beacon',
    iconUrl: `${ICON_PATH}icon-beacon@3x.png`,
    name: 'Baken',
    enabled: true
  },
  '3D sensor': {
    id: '3D sensor',
    iconUrl: `${ICON_PATH}icon-3d-sensor@3x.png`,
    name: '3D Sensor',
    enabled: true
  },
  'WiFi sensor': {
    id: 'WiFi sensor',
    iconUrl: `${ICON_PATH}icon-wifi@3x.png`,
    name: 'WiFi Sensor',
    enabled: true
  },
  'Telcamera': { // eslint-disable-line quote-props
    id: 'Telcamera',
    iconUrl: `${ICON_PATH}icon-tel@3x.png`,
    name: 'Telcamera',
    enabled: true
  }
};

let clicker;

let markerGroup;

export function getMarkerCategory(thing) {
  return markerCategories[Object.keys(markerCategories).find((mt) => mt === thing.device_type)];
}

function getMarkerIcon(marker) {
  const iconUrl = markerCategories[marker.device_type].iconUrl;
  return L.icon({
    ...markerOptions,
    iconUrl
  });
}

export function cancelHighlight(map) {
  if (clicker) {
    map.removeLayer(clicker);
  }
}

export function getMarkerCategories() {
  return markerCategories;
}

export function toggleMarkers(markerCategory) {
  markerCategories[markerCategory].enabled = !markerCategories[markerCategory].enabled;
  if (markerCategories[markerCategory].layer) {
    if (markerCategories[markerCategory].enabled) {
      markerGroup.addLayer(markerCategories[markerCategory].layer);
    } else {
      markerGroup.removeLayer(markerCategories[markerCategory].layer);
    }
  }
}

export function fitBounds(map, p1, p2) {
  map.fitBounds([p1, p2]);
}

export function onMap(map, id, where) {
  const HomeControl = L.Control.extend({

    options: {
      position: where
    },

    onAdd(map) {
      return L.DomUtil.get(id);
    }
  });
  map.addControl(new HomeControl());
}

function geolocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Toegang tot locatie is afgeschermd.';
    case error.POSITION_UNAVAILABLE:
      return 'Locatie informatie is niet beschikbaar.';
    case error.TIMEOUT:
      return 'Locatie informatie kon niet tijdig worden gevonden.';
    case error.UNKNOWN_ERROR:
      return 'Locatie informatie kon niet worden gevonden.';
    default:
      return null;
  }
}

function homeButton(map, onClick) {
  const HomeControl = L.Control.extend({

    options: {
      position: 'topright'
    },

    onAdd(map) {
      const container = L.DomUtil.create('img', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.src = `${ICON_PATH}home-3x.png`;
      container.style.backgroundColor = 'white';
      container.style.width = '33px';
      container.style.height = '33px';

      container.onclick = () => {
        cancelHighlight(map);
        map.closePopup();
        onClick(null);
        mapHome(map);
      };
      return container;
    }
  });

  const PositionControl = L.Control.extend({

    options: {
      position: 'topright'
    },

    onAdd(map) {
      const container = L.DomUtil.create('img', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.src = `${ICON_PATH}location-24.png`;
      container.style.backgroundColor = 'white';
      container.style.width = '33px';
      container.style.height = '33px';

      container.onclick = () => {
        cancelHighlight(map);
        map.closePopup();
        onClick(null);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => mapGo(map, pos.coords.latitude, pos.coords.longitude),
            (err) => console.log(geolocationError(err))
          );
        } else {
          mapHome(map);
        }
      };
      return container;
    }
  });

  map.addControl(new HomeControl());
  map.addControl(new PositionControl());
}

export function showLocations(map, markers, onClick) {
  const showInfo = (loc) => {
    if (clicker) {
      map.removeLayer(clicker);
    }
    clicker = L.circleMarker(loc.wgs84_geometry.coordinates);
    clicker.addTo(map);
    onClick(loc);
  };

  const showPopup = async (marker) => {
    const [lat, lon] = marker.wgs84_geometry.coordinates;
    const markerCategory = getMarkerCategory(marker);
    L.popup({ offset: new L.Point(0, -20), autoPan: false })
      .setContent(`<div class="font-weight-bold">${markerCategory.name}</div>${marker.name}`)
      .setLatLng([lat, lon])
      .openOn(map);
  };

  const hidePopup = (loc) => map.closePopup();

  markerGroup = L.markerClusterGroup({
    disableClusteringAtZoom: 16,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: false
  });

  Object.keys(markerCategories).forEach((markerCategory) => {
    const layer = L.featureGroup();
    markers
      .filter((marker) => marker.device_type === markerCategory)
      .forEach((marker) =>
        L.marker(marker.wgs84_geometry.coordinates, { icon: getMarkerIcon(marker) })
          .addTo(layer)
          .on('click', () => showInfo(marker))
          .on('mouseover', () => showPopup(marker))
          .on('mouseout', () => hidePopup(marker)));
    markerCategories[markerCategory].layer = layer;
    markerCategories[markerCategory].enabled = true;
    markerGroup.addLayer(layer);
  });

  map.addLayer(markerGroup);
  // homeButton(map, onClick)
  return markerGroup;
}
