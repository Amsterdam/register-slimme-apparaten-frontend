import CONFIGURATION from 'shared/configuration/environment';
import { readPaginatedData, readData } from '../datareader';

export const fetchDevices = async url => {
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

export const fetchCameraAreas = async () => {
  const url = `${CONFIGURATION.MAP_ROOT}maps/overlastgebieden?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=ms:cameratoezichtgebied&version=1.1.0&srsName=EPSG:4326`;
  return readData(url);
};
