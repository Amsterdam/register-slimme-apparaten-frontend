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
  return all.find((element) => element.id === id);
}

export function initIoT() {
  devices = getDevices();
}
