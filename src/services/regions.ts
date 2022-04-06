import axios, { AxiosResponse } from 'axios';
import { Polygon } from 'geojson';

export type Area = {
  code: string;
  geometrie: Polygon;
  naam: string;
};

/**
 * Returns the complete url for the Gebieden API given an endpoint
 * @param endpoint
 * @returns {string}
 */
function getUrl(endpoint: string): string {
  return `https://api.data.amsterdam.nl/v1/gebieden${endpoint}?eindGeldigheid[isnull]=true&_pageSize=100000`;
}

/**
 * Requests data from a given url, resolving to response.data (default) or any other optionally specified value
 * @param url
 * @param resolve
 */
export async function readData(url: string, options = {}, resolve = (d: AxiosResponse<any, any>) => d.data) {
  const response = await axios.get(url, options);
  return resolve(response);
}

/**
 * Gets all the stadsdelen
 * The result is cached
 */
export async function getAllStadsdelen(): Promise<Area[]> {
  const url = getUrl('/stadsdelen/');

  const result = await readData(url);
  return result._embedded.stadsdelen as Area[];
}

/**
 * Gets all the gebieden
 * The result is cached
 */
export async function getAllGebieden(): Promise<Area[]> {
  const url = getUrl('/ggwgebieden/');

  const result = await readData(url);
  return result._embedded.ggwgebieden as Area[];
}

/**
 * Gets all the wijken
 * The result is cached
 */
export async function getAllWijken(): Promise<Area[]> {
  const url = getUrl('/wijken/');

  const result = await readData(url);
  return result._embedded.wijken as Area[];
}

/**
 * Gets all the buurten
 * The result is cached
 */
export async function getAllBuurten(): Promise<Area[]> {
  const url = getUrl('/buurten/');

  const result = await readData(url);
  return result._embedded.buurten as Area[];
}

const regions: { [key: string]: Area } = {};
export async function getAllRegions() {
  if (Object.keys(regions).length === 0) {
    const response = await Promise.all([getAllStadsdelen(), getAllGebieden(), getAllWijken(), getAllBuurten()]);
    const allAreas = response.flat();

    allAreas.forEach((a) => {
      regions[a.code.toLowerCase()] = a;
    });
  }

  return regions;
}

export function getRegions() {
  return regions;
}
