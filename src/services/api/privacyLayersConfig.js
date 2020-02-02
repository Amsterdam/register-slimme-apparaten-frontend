import CONFIGURATION from 'shared/configuration/environment';
import { CATEGORY_NAMES, categories } from '../../shared/configuration/categories';
import { readData } from '../datareader';
import { fetchDevices } from './iotApi';

const PRIVACY_LAYERS_CONFIG = [
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
    layers: Object.entries(categories).map(([key, value]) => ({
      name: `IoT ${key}`,
      filter: item => item.properties.application === value.name,
      className: `iot${key}`,
      category: key,
      transformer: item => item,
    })),
  },
];

export default PRIVACY_LAYERS_CONFIG;
