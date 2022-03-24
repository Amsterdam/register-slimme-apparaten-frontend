import { DomEvent, circleMarker } from 'leaflet';
import CONFIGURATION from '../../shared/environment';
import { mapSensorTypeToColor, SensorTypes } from '../../utils/types';
import { readData, readPaginatedData } from '../datareader';

const LAYERS_CONFIG = [
  {
    name: 'Sensornet',
    url: `${CONFIGURATION.API_ROOT}iothings/devices/`,
    fetchService: readPaginatedData,
    transformer: (item) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.location.longitude, item.location.latitude], // See also: https://datatracker.ietf.org/doc/html/rfc7946#section-3.1
      },
      properties: {
        privacy: item.privacy_declaration,
        contact: item.owner,
        color: mapSensorTypeToColor[item.type] || '#000000',
        containsPiData: item.contains_pi_data,
        organisation: item.owner.organisation,
        sensorType: item.type,
        themes: item.themes,
        longitude: item.location.longitude,
        latitude: item.location.latitude,
        activeUntil: flipDate(item.active_until),
        goal: item.observation_goal,
        legalGround: item.legal_ground,
        originalData: item,
        reference: item?.reference,
      },
    }),
  },
  {
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=CROWDSENSOREN&THEMA=cmsa',
    fetchService: readData,
    name: 'WiFi sensor Crowd Management',
    filter: (item) => item.properties.Soort === 'WiFi sensor',
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy: item.properties.Privacyverklaring,
        contact: {
          email: '',
          name: 'Afdeling verkeersmanagment',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Aanwezigheid],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Aanwezigheid,
        themes: ['Mobiliteit'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Tellen van mensen.',
        legalGround: 'Verkeersmanagment in de rol van wegbeheerder.',
        originalData: item,
        reference: item.properties?.Objectnummer,
      },
    }),
  },
  {
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=CROWDSENSOREN&THEMA=cmsa',
    fetchService: readData,
    name: 'Sensoren Crowd Management',
    filter: (item) => ['Telcamera', 'Corona CMSA', '3D sensor'].includes(item.properties.Soort),
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy: item.properties.Privacyverklaring,
        contact: {
          email: '',
          name: 'Afdeling verkeersmanagment',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Optische],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Optische,
        themes: ['Mobiliteit'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Tellen van mensen.',
        legalGround: 'Verkeersmanagment in de rol van wegbeheerder.',
        originalData: item,
        reference: item.properties?.Objectnummer,
      },
    }),
  },
  {
    name: 'Camera`s brug- en sluisbediening',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_BRUGSLUIS&THEMA=privacy',
    fetchService: readData,
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy: item.properties.Privacyverklaring,
        contact: {
          email: '',
          name: 'Afdeling stedelijkbeheer',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Optische],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Optische,
        themes: ['Mobiliteit'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Het bedienen van sluisen en bruggen.',
        legalGround: 'Sluisbeheerder in het kader van de woningwet 1991',
        originalData: item,
        reference: item.properties?.BrugSluisNummer,
      },
    }),
  },
  {
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS&THEMA=vis',
    fetchService: readData,
    name: 'CCTV camera`s Verkeersmanagement',
    filter: (item) => item.properties.Soort === 'TV Camera',
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy:
          'https://www.amsterdam.nl/privacy/specifieke/privacyverklaring-parkeren-verkeer-bouw/verkeersmanagement',
        contact: {
          email: '',
          name: 'Afdeling verkeersmanagement',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Optische],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Optische,
        themes: ['Mobiliteit'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Waarnemen van het verkeer.',
        legalGround: 'Verkeersmanagment in de rol van wegbeheerder.',
        originalData: item,
        reference: item.properties?.Objectnummer_Amsterdam,
      },
    }),
  },
  {
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS&THEMA=vis',
    fetchService: readData,
    name: 'Kentekencamera, reistijd (MoCo)',
    filter: (item) => item.properties.Soort === 'Kentekencamera, reistijd (MoCo)',
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy:
          'https://www.amsterdam.nl/privacy/specifieke/privacyverklaring-parkeren-verkeer-bouw/reistijden-meetsysteem-privacy/',
        contact: {
          email: '',
          name: 'Afdeling verkeersmanagement',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Optische],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Optische,
        themes: ['Mobiliteit'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Het tellen van voertuigen en meten van doorstroming.',
        legalGround: 'Verkeersmanagement in de rol van wegbeheerder.',
        originalData: item,
        reference: item.properties?.Objectnummer_Amsterdam,
      },
    }),
  },
  {
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS&THEMA=vis',
    fetchService: readData,
    name: 'Kentekencamera, milieuzone',
    filter: (item) => item.properties.Soort === 'Kentekencamera, milieuzone',
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy: 'https://www.amsterdam.nl/privacy/specifieke/privacyverklaringen-b/milieuzones/',
        contact: {
          email: '',
          name: 'Afdeling stedelijk beheer',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Optische],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Optische,
        themes: ['Mobiliteit', 'Milieu'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Handhaving van verkeersbesluiten',
        legalGround: 'Verkeersbesluiten in de rol van wegbeheerder.',
        originalData: item,
        reference: item.properties?.Objectnummer_Amsterdam,
      },
    }),
  },
  {
    name: 'AIS masten',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_AISMASTEN&THEMA=privacy',
    fetchService: readData,
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy: item.properties.Privacyverklaring,
        contact: {
          email: '',
          name: 'Programma varen',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Optische],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Optische,
        themes: ['Mobiliteit'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Vaarweg management',
        legalGround: 'In de rol van vaarwegbeheerder op basis van de binnenvaartwet.',
        originalData: item,
        reference: item.properties?.Locatienaam,
      },
    }),
  },
  {
    name: 'Verkeersonderzoek met cameras',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_OVERIG&THEMA=privacy',
    fetchService: readData,
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy: item.properties.Privacyverklaring,
        contact: {
          email: 'verkeersonderzoek@amsterdam.nl',
          name: 'Afdeling kennis en kaders',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Optische],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Optische,
        themes: ['Mobiliteit'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Tellen van voertuigen.',
        legalGround: 'Verkeersmanagement in de rol van wegbeheerder.',
        originalData: item,
        reference: `privacy-other-${item.id}`,
      },
    }),
  },
  {
    name: 'Beweegbare Fysieke Afsluiting (BFA)',
    url: 'https://maps.amsterdam.nl/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS_BFA&THEMA=vis',
    fetchService: readData,
    transformer: (item) => ({
      type: 'Feature',
      geometry: item.geometry,
      properties: {
        privacy: item.properties.Privacyverklaring,
        contact: {
          email: '',
          name: 'Afdeling asset management',
          organisation: 'Gemeente Amsterdam',
        },
        color: mapSensorTypeToColor[SensorTypes.Optische],
        containsPiData: true,
        organisation: 'Gemeente Amsterdam',
        sensorType: SensorTypes.Optische,
        themes: ['Mobiliteit'],
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
        activeUntil: '01-01-2050',
        goal: 'Verstrekken van selectieve toegang.',
        legalGround: 'Verkeersmanagement in de rol van wegbeheerder.',
        originalData: item,
        reference: item.properties?.BFA_nummer,
      },
    }),
  },
];

const flipDate = (date) => {
  const arr = date?.split('-');

  if (arr.length < 3) {
    return date;
  }

  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};

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
    const marker = circleMarker(latlng, {
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
