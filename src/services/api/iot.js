import CONFIGURATION from 'shared/services/configuration/configuration';
import { readPaginatedData } from '../datareader';
import { getMarkerCategory } from '../marker';

export async function getDevices() {
  const devices = await readPaginatedData(`${CONFIGURATION.API_ROOT}iothings/devices/`);
  return devices.map(device => ({
    ...device,
    category: getMarkerCategory(device).name,
    soort: (device.types.length && device.types[0].name) || 'Onbekend',
    privacy: '',
    contact: 'iothings',
  }));
}

export async function getCameraAreas() {
  return fetch(
    `${CONFIGURATION.MAP_ROOT}maps/overlastgebieden?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=ms:cameratoezichtgebied&version=1.1.0`,
  ).then(response => response.json());
}
