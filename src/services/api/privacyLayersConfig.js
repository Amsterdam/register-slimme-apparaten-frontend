import { CATEGORY_NAMES } from '../../static/categories';

const PRIVACY_LAYERS_CONFIG = [
  // {
  //   name: '',
  //   url: 'https://service.vorin-amsterdam.nl/camera-geo_2/camera/geo',
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
    layers: [
      {
        name: 'WiFi sensor Crowd Management',
        filter: item => item.properties.Soort === 'WiFi sensor' && item.properties.Actief === 'Ja',
        className: 'cmsa',
        category: CATEGORY_NAMES.SENSOR,
      },
    ],
  },
  {
    name: 'AIS masten',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_AISMASTEN&THEMA=privacy',
    className: 'ais-masten',
    category: CATEGORY_NAMES.SLIMME_VERKEERSINFORMATIE,
  },
  {
    name: 'Wagenparkscan',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_WAGENPARKSCAN&THEMA=privacy',
    className: 'wagenparkscan',
    category: CATEGORY_NAMES.CAMERA,
  },
  {
    name: 'Verkeersonderzoek en Overig',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_OVERIG&THEMA=privacy',
    className: 'overig',
    category: CATEGORY_NAMES.CAMERA,
  },
  {
    name: 'Beweegbare Fysieke Afsluiting (BFA)',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=VIS_BFA&THEMA=vis',
    className: 'bfa',
    category: CATEGORY_NAMES.CAMERA,
  },
];

export default PRIVACY_LAYERS_CONFIG;
