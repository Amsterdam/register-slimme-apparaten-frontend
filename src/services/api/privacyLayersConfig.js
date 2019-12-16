const getCircleStyle = fillColor => ({
  radius: 8,
  fillColor,
  color: '#000',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.5,
});

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
        style: getCircleStyle('#112233'),
      },
    ],
  },
  {
    name: 'AIS masten',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_AISMASTEN&THEMA=privacy',
    className: 'ais-masten',
    style: getCircleStyle('#223344'),
  },
  {
    name: 'Wagenparkscan',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_WAGENPARKSCAN&THEMA=privacy',
    className: 'wagenparkscan',
    style: getCircleStyle('#334455'),
  },
  {
    name: 'Verkeersonderzoek en Overig',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=PRIVACY_OVERIG&THEMA=privacy',
    className: 'overig',
    style: getCircleStyle('#445566'),
  },
  {
    name: 'Beweegbare Fysieke Afsluiting (BFA)',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=VIS_BFA&THEMA=vis',
    className: 'bfa',
    style: {
      radius: 8,
      fillColor: getCircleStyle('#556677'),
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    },
  },
];

export default PRIVACY_LAYERS_CONFIG;
