import CONFIGURATION from 'shared/services/configuration/configuration';

const PRIVACY_LAYERS_CONFIG = [
  {
    name: '',
    url: `${CONFIGURATION.MAP_ROOT}maps/overlastgebieden?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=ms:cameratoezichtgebied&version=1.1.0`,
  },
  {
    name: '',
    url: 'https://service.vorin-amsterdam.nl/camera-geo_2/camera/geo',
    layers: [
      {
        name: 'Verkeershandhaving',
        filter: item => item.properties.doel.find(d => d.startsWith('verkeershandhaving')),
      },
      {
        name: 'Verkeershandhaving',
        filter: item => item.properties.doel.find(d => d.startsWith('verkeersmanagement')),
      },
    ],
  },
  {
    name: 'cmsa',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=CROWDSENSOREN&THEMA=cmsa',
    layers: [
      {
        name: 'WiFi sensor Crowd Management',
        filter: item => item.properties.Soort === 'WiFi sensor' && item.properties.Actief === 'Ja',
      },
    ],
  },
  {
    name: 'AIS masten',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_AISMASTEN&THEMA=privacy',
  },
  {
    name: 'Wagenparkscan',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_WAGENPARKSCAN&THEMA=privacy',
  },
  {
    name: 'Verkeersonderzoek en Overig',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_OVERIG&THEMA=privacy',
  },
  {
    name: 'Beweegbare Fysieke Afsluiting (BFA)',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=VIS_BFA&THEMA=vis',
  },
];

export default PRIVACY_LAYERS_CONFIG;
