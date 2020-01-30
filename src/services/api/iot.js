import CONFIGURATION from 'shared/services/configuration/configuration';
import { readPaginatedData } from '../datareader';

export const getDevices = async url => {
  const devices = await readPaginatedData(url);
  const features = devices.map(item => ({
    id: item.id,
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [item.longitude, item.latitude],
    },
    properties: {
      ...item,
    },
    // IoT Specific
    category: item.application,
    soort: (item.types.length && item.types[0].name) || 'Onbekend',
    privacy: item.privacy || '',
    contact: 'iothings',
    longitude: item.longitude,
    latitude: item.latitude,
  }));
  return {
    type: 'FeatureCollection',
    features,
  };
};

export const getCameraAreas = async () =>
  fetch(
    `${CONFIGURATION.MAP_ROOT}maps/overlastgebieden?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=ms:cameratoezichtgebied&version=1.1.0`,
  ).then(response => response.json());

export const getGeojson = async url => {

  const result = await fetch(url);
  const data = await result.json();
  return data;
}
