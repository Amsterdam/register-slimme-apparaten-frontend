import { DomEvent } from 'leaflet';
import { mapSensorTypeToColor } from 'utils/types';
import { readPaginatedData } from '../datareader';

const LAYERS_CONFIG = [
  {
    name: 'sensornet api',
    url: 'http://localhost:8000/iothings/devices/',
    fetchService: readPaginatedData,
    layers: [
      {
        name: 'Sensornet',
        transformer: (item) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [item.location.latitude, item.location.longitude],
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
          },
        }),
      },
    ],
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
