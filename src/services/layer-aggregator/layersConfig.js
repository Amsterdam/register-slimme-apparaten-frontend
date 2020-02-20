import CONFIGURATION from 'shared/configuration/environment';
import { DomEvent } from 'leaflet';
import { getMarkerIcon } from 'services/marker';
import { CATEGORY_NAMES, categories } from '../../shared/configuration/categories';
import { readData } from '../datareader';
import { fetchDevices, fetchCameraAreas } from './layersFetcher';

const LAYERS_CONFIG = [
  // {
  //   name: '',
  //   url: 'https://service.vorin-amsterdam.nl/camera-geo_2/camera/geo',
  //   fetchService: fetch,
  //   layers: [
  //     {
  //       name: 'Verkeershandhaving',
  //       filter: item => item.properties.doel.find(d => d.startsWith('verkeershandhaving')),
  //     },
  //     {
  //       name: 'Verkeershandhaving',
  //       filter: item => item.properties.doel.find(d => d.startsWith('verkeersmanagement')),
  //     },
  //   ],
  // },
  {
    name: 'cmsa',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=CROWDSENSOREN&THEMA=cmsa',
    fetchService: readData,
    layers: [
      {
        name: 'WiFi sensor Crowd Management',
        filter: item => item.properties.Soort === 'WiFi sensor' && item.properties.Actief === 'Ja',
        className: 'cmsa',
        category: CATEGORY_NAMES.SENSOR,
        transformer: item => ({
          ...item,
          category: CATEGORY_NAMES.SENSOR,
          soort: item.properties.Soort,
          privacy: item.properties.Privacyverklaring || '',
          contact: 'cmsa',
          longitude: item.geometry.coordinates[0],
          latitude: item.geometry.coordinates[1],
        }),
      },
    ],
  },
  {
    name: 'AIS masten',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_AISMASTEN&THEMA=privacy',
    fetchService: readData,
    className: 'ais-masten',
    category: CATEGORY_NAMES.SLIMME_VERKEERSINFORMATIE,
    transformer: item => ({
      ...item,
      category: CATEGORY_NAMES.SLIMME_VERKEERSINFORMATIE,
      soort: item.properties.Locatienaam,
      privacy: '',
      contact: 'ais-masten',
      longitude: item.geometry.coordinates[0],
      latitude: item.geometry.coordinates[1],
    }),
  },
  {
    name: 'Wagenparkscan',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_WAGENPARKSCAN&THEMA=privacy',
    fetchService: readData,
    className: 'wagenparkscan',
    category: CATEGORY_NAMES.CAMERA,
    transformer: item => ({
      ...item,
      category: CATEGORY_NAMES.CAMERA,
      soort: item.properties.Locatienaam,
      privacy: item.properties.Privacyverklaring || '',
      contact: 'wagenparkscan',
      longitude: item.geometry.coordinates[0],
      latitude: item.geometry.coordinates[1],
    }),
  },
  {
    name: 'Verkeersonderzoek en Overig',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_OVERIG&THEMA=privacy',
    fetchService: readData,
    className: 'overig',
    category: CATEGORY_NAMES.CAMERA,
    transformer: item => ({
      ...item,
      category: CATEGORY_NAMES.CAMERA,
      soort: item.properties.Soort,
      privacy: '',
      contact: 'overig',
      longitude: item.geometry.coordinates[0],
      latitude: item.geometry.coordinates[1],
    }),
  },
  {
    name: 'Beweegbare Fysieke Afsluiting (BFA)',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=VIS_BFA&THEMA=vis',
    fetchService: readData,
    className: 'bfa',
    category: CATEGORY_NAMES.CAMERA,
    transformer: item => ({
      ...item,
      category: CATEGORY_NAMES.CAMERA,
      soort: `${item.properties.BFA_nummer} - ${item.properties.BFA_type} - ${item.properties.Standplaats}`,
      privacy: item.properties.Privacyverklaring || '',
      contact: 'bfa',
      longitude: item.geometry.coordinates[0],
      latitude: item.geometry.coordinates[1],
    }),
  },
  {
    name: 'iothings',
    url: `${CONFIGURATION.API_ROOT}iothings/devices/`,
    fetchService: fetchDevices,
    layers: Object.entries(categories).map(([key]) => ({
      name: `IoT ${key}`,
      filter: item => item.properties.application === key,
      className: `iot${key}`,
      category: key,
      transformer: item => item,
    })),
  },
];

export const POLYGON_LAYERS_CONFIG = [
  {
    id: 'cameras',
    name: CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED,
    url: `${CONFIGURATION.MAP_ROOT}maps/overlastgebieden?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&srsName=EPSG:4326&Typename=ms:cameratoezichtgebied&version=1.1.0`,
    fetchService: fetchCameraAreas,
    className: 'cameras',
    category: CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED,
    transformer: item => item,
  },
];

const markerStyle = {
  fillColor: '#f14600',
  opacity: 1,
  color: '#f14600',
  strokeOpacity: 1,
  weight: 1,
};

const markerStyleActive = {
  weight: 3,
};

export const getPointOptions = (CATEGORY_NAME, onItemSelected) => ({
  onEachFeature: (feature, layer) => {
    layer.on('click', e => {
      DomEvent.stopPropagation(e);

      console.log('showInfo device', CATEGORY_NAME, feature);
      onItemSelected('devices', feature,layer._icon);
    });
  },
  pointToLayer: (feature, latlng) => {
    const marker = L.marker(latlng, {
      icon: getMarkerIcon(CATEGORY_NAME),
    });
    marker.feature = feature;
    return marker;
  },
});

export const getPolygonOptions = (CATEGORY_NAME, onItemSelected) => ({
  style: markerStyle,
  onEachFeature: (feature, layer) => {
    layer.on('click', e => {
      DomEvent.stopPropagation(e);
      // e.target.setStyle(markerStyleActive);

      console.log('showInfo camera', layer);
      onItemSelected('cameras', feature, layer.getElement())
    });
  },
});

export const LAYER_OPTIONS_CONFIG = {
  [CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED]: {
    options: {
      style: markerStyle,
      onEachFeature: (feature, layer) => {
        layer.on('click', e => {
          DomEvent.stopPropagation(e);
          e.target.setStyle(markerStyleActive);
          // showInfo
          console.log('showInfo', feature);
        });
      },
    },
  },
  [CATEGORY_NAMES.CAMERA]: {
    // icon: getMarkerIcon(CATEGORY_NAMES.CAMERA),
    options: getPointOptions(CATEGORY_NAMES.CAMERA, ),
  },
  [CATEGORY_NAMES.SENSOR]: {
    options: getPointOptions(CATEGORY_NAMES.SENSOR),
  },
  [CATEGORY_NAMES.BEACONS]: {
    options: getPointOptions(CATEGORY_NAMES.BEACONS),
  },
  [CATEGORY_NAMES.SLIMME_VERKEERSINFORMATIE]: {
    options: getPointOptions(CATEGORY_NAMES.SLIMME_VERKEERSINFORMATIE),
  },
  [CATEGORY_NAMES.SLIMME_LANTAARNPAAL]: {
    options: getPointOptions(CATEGORY_NAMES.SLIMME_LANTAARNPAAL),
  },
};

export default LAYERS_CONFIG;
