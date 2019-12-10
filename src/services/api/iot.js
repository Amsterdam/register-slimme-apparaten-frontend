import CONFIGURATION from 'shared/services/configuration/configuration';
import { readPaginatedData } from '../datareader';

let devices = null;

export async function getDevices() {
  return readPaginatedData(`${CONFIGURATION.API_ROOT}iothings/devices/`);
}

export async function getDevice(id) {
  if (!devices) {
    devices = getDevices();
  }
  const all = await devices;
  return all.find(element => element.id === id);
}

export async function getCameraAreas() {
  return fetch(
    `${CONFIGURATION.MAP_ROOT}maps/overlastgebieden?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=ms:cameratoezichtgebied&version=1.1.0`,
  ).then(response => response.json());
}

export const getPrivacyLayers = async () => {
  const layers = await Promise.all(
    [
      `${CONFIGURATION.MAP_ROOT}maps/overlastgebieden?REQUEST=GetFeature&SERVICE=wfs&OUTPUTFORMAT=application/json;%20subtype=geojson;%20charset=utf-8&Typename=ms:cameratoezichtgebied&version=1.1.0`,
      // 'https://service.vorin-amsterdam.nl/camera-geo_2/camera/geo',
      // 'https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=CROWDSENSOREN&THEMA=cmsa',
    ].map(async url => {
      const data = await fetch(url, { mode: 'no-cors' }).then(response => response.json());
      return data;
    }),
  );
  return layers;
};
