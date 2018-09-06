/* eslint-disable */

import L from 'leaflet';
import 'leaflet.markercluster';

import { mapHome, mapGo } from './map';

/* eslint-disable no-unused-vars */
// Import marker icons so Webpack adds them as separate files instead of inlining them
import Camera from '../../public/images/icon-camera@3x.png';
import Beacon from '../../public/images/icon-beacon@3x.png';
import Sensor from '../../public/images/icon-sensor@3x.png';
import Laadpaal from '../../public/images/icon-laadpaal@3x.png';
import Verkeer from '../../public/images/icon-verkeer@3x.png';
import Lantaarnpaal from '../../public/images/icon-lantaarn@3x.png';
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
    enabled: true,
    description: `Uitleg over camera's.`,
    subtypes: [
      'Telcamera',
      'Kentekenherkenning',
      'Beeld' 
    ]
  },
  'Sensor': { // eslint-disable-line quote-props
    id: 'Sensor',
    iconUrl: `${ICON_PATH}icon-sensor@3x.png`,
    name: 'Sensor',
    enabled: true,
    description: 'Uitleg over sensoren.',
    subtypes: [
      'Luchtkwaliteit',
      'Vervoerstromen (aantal vervoermiddelen)',
      'Geluid',
      'Connectiviteitmeting (Wifi Tracking)'
    ]
  },
  'Beacon': { // eslint-disable-line quote-props
    id: 'Beacon',
    iconUrl: `${ICON_PATH}icon-beacon@3x.png`,
    name: 'Baken',
    enabled: true,
    description: 'Uitleg over bakens.',
    subtypes: []
  },
  'Slimme laadpaal': {
    id: 'Slimme laadpaal',
    iconUrl: `${ICON_PATH}icon-laadpaal@3x.png`,
    name: 'Slimme laadpaal',
    enabled: true,
    description: 'Uitleg over slimme laadpalen.',
    subtypes: []
  },
  'Slimme verkeersinformatie': {
    id: 'Slimme verkeersinformatie',
    iconUrl: `${ICON_PATH}icon-verkeer@3x.png`,
    name: 'Slimme verkeersinformatie',
    enabled: true,
    description: 'Uitleg over slimme verkeersinformatie.',
    subtypes: ['Slimme verkeerslichten', 'DRIPS']
  },
  'Slimme lantaarnpaal': { // eslint-disable-line quote-props
    id: 'Slimme lantaarnpaal',
    iconUrl: `${ICON_PATH}icon-lantaarn@3x.png`,
    name: 'Slimme lantaarnpaal',
    enabled: true,
    description: 'Uitleg over slimme lantaarnpalen.',
    subtypes: []
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
          .on('click', () => showInfo(marker)));
          // Don't show a hover Popup (for now)
          // .on('mouseover', () => showPopup(marker))
          // .on('mouseout', () => hidePopup(marker)));
    markerCategories[markerCategory].layer = layer;
    markerCategories[markerCategory].enabled = true;
    markerGroup.addLayer(layer);
  });

  map.addLayer(markerGroup);
  // homeButton(map, onClick)
  return markerGroup;
}
