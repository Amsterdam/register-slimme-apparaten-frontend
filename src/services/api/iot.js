import { readPaginatedData } from '../datareader';

const API = 'https://api.data.amsterdam.nl';

let things = null;
let locations = null;

export async function getMarkers() {
  return readPaginatedData(`${API}/vsd/iot_markers/`);
}

export async function getLocations() {
  const data = await readPaginatedData(`${API}/vsd/iot_locations/`);
  const result = data.reduce((obj, item) => ({ ...obj, [item.id]: item }), {});
  return result;
}

export async function getThings() {
  const data = await readPaginatedData(`${API}/vsd/iot_things/`);
  const result = data.reduce((obj, item) => ({ ...obj, [item.id]: item }), {});
  return result;
}

export async function getThing(id) {
  if (!things) {
    things = getThings();
  }
  const all = await things;
  return all[id];
}

export async function getLocation(id) {
  if (!locations) {
    locations = getLocations();
  }
  const all = await locations;
  return all[id];
}

export function initIoT() {
  locations = getLocations();
  things = getThings();
}
