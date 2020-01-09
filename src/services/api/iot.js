import CONFIGURATION from 'shared/services/configuration/configuration';
import { readPaginatedData } from '../datareader';

export async function getDevices() {
  return readPaginatedData(`${CONFIGURATION.API_ROOT}iothings/devices/`);
}

export async function getCameraAreas() {
  return fetch(
    `${CONFIGURATION.MAP_ROOT}maps/overlastgebieden?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=ms:cameratoezichtgebied&version=1.1.0`,
  ).then(response => response.json());
}
