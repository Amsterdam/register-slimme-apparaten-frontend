import CONFIGURATION from 'shared/configuration/environment';
import { DomEvent } from 'leaflet';
import { CATEGORY_NAMES, categories } from '../../shared/configuration/categories';
import { readData } from '../datareader';
import { fetchDevices } from './layersFetcher';

const LAYERS_CONFIG = [
  {
    name: 'cmsa',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=CROWDSENSOREN&THEMA=cmsa',
    fetchService: readData,
    layers: [
      {
        name: 'WiFi sensor Crowd Management',
        filter: (item) => item.properties.Soort === 'WiFi sensor' && item.properties.Actief === 'Ja',
        className: 'cmsa',
        category: CATEGORY_NAMES.SENSOR,
        transformer: (item) => ({
          ...item,
          properties: {
            ...item.properties,
            category: CATEGORY_NAMES.SENSOR,
            soort: item.properties.Soort,
            privacy: item.properties.Privacyverklaring || '',
            contact: 'cmsa',
            color: '#FF0000',
            containsPiData: false,
            organisation: 'Gemeente Amsterdam',
            sensorType: 'Aanwezigheid of nabijheidsensor',
            longitude: item.geometry.coordinates[0],
            latitude: item.geometry.coordinates[1],
            themes: ['Bouwen en verbouwen', 'Veiligheid'],
          },
        }),
      },
    ],
  },
  {
    name: 'Camera`s brug- en sluisbediening',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_BRUGSLUIS&THEMA=privacy',
    fetchService: readData,
    category: CATEGORY_NAMES.CAMERA,
    transformer: (item) => ({
      ...item,
      properties: {
        ...item.properties,
        category: CATEGORY_NAMES.CAMERA,
        soort: item.properties.Naam,
        privacy: item.properties.Privacyverklaring,
        contact: item.properties.Eigenaar,
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        color: '#008080',
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: 'Optische / camera sensor',
        themes: ['Woningmarkt', 'Veiligheid'],
      },
    }),
  },
  {
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS&THEMA=vis',
    fetchService: readData,
    layers: [
      {
        category: CATEGORY_NAMES.CAMERA,
        name: 'CCTV camera`s Verkeersmanagement',
        filter: (item) => item.properties.Soort === 'TV Camera',
        transformer: (item) => ({
          ...item,
          properties: {
            ...item.properties,
            category: CATEGORY_NAMES.CAMERA,
            soort: item.properties.Soort,
            privacy:
              'https://www.amsterdam.nl/privacy/specifieke/privacyverklaring-parkeren-verkeer-bouw/verkeersmanagement',
            contact: '',
            longitude: item.geometry.coordinates[0],
            latitude: item.geometry.coordinates[1],
            color: '#808000',
            containsPiData: true,
            organisation: 'Gemeente Amsterdam',
            sensorType: 'Geluidsensor',
            themes: ["Gezondheidsrisico's", 'Veiligheid'],
          },
        }),
      },
    ],
  },
  {
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS&THEMA=vis',
    fetchService: readData,
    layers: [
      {
        category: CATEGORY_NAMES.CAMERA,
        name: 'Kentekencamera, reistijd (MoCo)',
        filter: (item) => item.properties.Soort === 'Kentekencamera, reistijd (MoCo)',
        transformer: (item) => ({
          ...item,
          properties: {
            ...item.properties,
            category: CATEGORY_NAMES.CAMERA,
            soort: item.properties.Soort,
            privacy:
              'https://www.amsterdam.nl/privacy/specifieke/privacyverklaring-parkeren-verkeer-bouw/reistijden-meetsysteem-privacy/',
            contact: '',
            longitude: item.geometry.coordinates[0],
            latitude: item.geometry.coordinates[1],
            color: '#008000',
            containsPiData: false,
            organisation: 'Anders',
            sensorType: 'Klimaatsensor',
            themes: ['Waterbeheer', 'Veiligheid'],
          },
        }),
      },
    ],
  },
  {
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS&THEMA=vis',
    fetchService: readData,
    layers: [
      {
        category: CATEGORY_NAMES.CAMERA,
        name: 'Kentekencamera, milieuzone',
        filter: (item) => item.properties.Soort === 'Kentekencamera, milieuzone',
        transformer: (item) => ({
          ...item,
          properties: {
            ...item.properties,
            category: CATEGORY_NAMES.CAMERA,
            soort: item.properties.Soort,
            privacy: 'https://www.amsterdam.nl/privacy/specifieke/privacyverklaringen-b/milieuzones/',
            contact: '',
            longitude: item.geometry.coordinates[0],
            latitude: item.geometry.coordinates[1],
            color: '#0000FF',
            containsPiData: true,
            organisation: 'Gemeente Amsterdam',
            sensorType: 'Chemiesensor',
            themes: ['Water'],
          },
        }),
      },
    ],
  },
  {
    name: 'AIS masten',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_AISMASTEN&THEMA=privacy',
    fetchService: readData,
    className: 'ais-masten',
    category: CATEGORY_NAMES.SLIMME_VERKEERSINFORMATIE,
    transformer: (item) => ({
      ...item,
      properties: {
        ...item.properties,
        category: CATEGORY_NAMES.SLIMME_VERKEERSINFORMATIE,
        soort: item.properties.Locatienaam,
        privacy: item.properties.Privacyverklaring,
        contact: 'ais-masten',
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        color: '#FF00FF',
        containsPiData: false,
        organisation: 'Anders',
        sensorType: 'Temperatuursensor',
        themes: ['Natuur- en landschapsbeheer'],
      },
    }),
  },
  {
    name: 'Verkeersonderzoek en Overig',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_OVERIG&THEMA=privacy',
    fetchService: readData,
    className: 'overig',
    category: CATEGORY_NAMES.CAMERA,
    transformer: (item) => ({
      ...item,
      properties: {
        ...item.properties,
        category: CATEGORY_NAMES.CAMERA,
        soort: item.properties.Soort,
        privacy: item.properties.Privacyverklaring,
        contact: 'overig',
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        color: '#800080',
        containsPiData: true,
        organisation: 'Anders',
        sensorType: 'Druksensor',
        themes: ['Klimaatverandering'],
      },
    }),
  },
  {
    name: 'Beweegbare Fysieke Afsluiting (BFA)',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS_BFA&THEMA=vis',
    fetchService: readData,
    className: 'bfa',
    category: CATEGORY_NAMES.CAMERA,
    transformer: (item) => ({
      ...item,
      properties: {
        ...item.properties,
        category: CATEGORY_NAMES.CAMERA,
        soort: `${item.properties.BFA_nummer} - ${item.properties.BFA_type} - ${item.properties.Standplaats}`,
        privacy: item.properties.Privacyverklaring || '',
        contact: 'bfa',
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        color: '#800000',
        containsPiData: false,
        organisation: 'Gemeente Amsterdam',
        sensorType: 'Dichtheidssensor',
        themes: ['Bodem', 'Veiligheid'],
      },
    }),
  },
  {
    name: 'iothings',
    url: `${CONFIGURATION.API_ROOT}iothings/devices/`,
    fetchService: fetchDevices,
    layers: Object.entries(categories).map(([key]) => ({
      name: `IoT ${key}`,
      filter: (item) => item.properties.application === key,
      className: `iot${key}`,
      category: key,
      transformer: (item) => ({
        ...item,
        properties: {
          ...item.properties,
          color: '#000000',
          containsPiData: true,
          organisation: 'Anders',
          sensorType: 'Aanwezigheid of nabijheidsensor',
          themes: ['Transport'],
        },
      }),
    })),
  },
];

export const getPointOptions = (CATEGORY_NAME, onItemSelected) => ({
  onEachFeature: (feature, layer) => {
    layer.on('click', (e) => {
      DomEvent.stopPropagation(e);
      const { id, category, contact: source } = feature;
      const queryString = `?id=${id}&category=${category}&source=${source}`;
      onItemSelected('devices', feature, layer._icon, queryString);
    });
  },
  pointToLayer: (feature, latlng) => {
    const marker = L.circleMarker(latlng, {
      color: 'white',
      fillColor: feature.properties.color,
      stroke: true,
      fillOpacity: 1,
      radius: 8,
    });
    marker.feature = feature;
    return marker;
  },
});

export default LAYERS_CONFIG;
