/* eslint-disable */

import axios from 'axios';

/**
 * Register HTTP status
 * @type {{pending: number, success: number, error: number}}
 */
export const HTTPStatus = {
  pending: 0, // The number of pending HTTP requests
  success: 0, // The number of successfully received responses
  error: 0 // The number of error responses
};

/**
 * Sleep a number of milliseconds
 * Usage: await sleep(n)
 * @param ms
 * @returns {Promise<any>}
 */
function sleep(ms) {
  return new Promise((resolve, reject) => { setTimeout(resolve, ms); });
}

/**
 * Simple HTTP GET method for a given url
 * @param url
 * @param nTries optional parameter specifying the number of retries, default = 5
 * @returns {Promise<*>}
 */
async function get(url, nTries = 5) {
  let result;
  let nTry = 0;
  do {
    try {
      HTTPStatus.pending++; // Track pending requests
      result = await axios({ method: 'get', url: url, withCredentials: true });
    } catch (error) {
      console.error('Retry...', url);
      nTry++;
      await sleep(nTry * 100); // small sleep before retry request
    } finally {
      HTTPStatus.pending--;
    }
  } while (!result && nTry < nTries);

  if (result) {
    HTTPStatus.success++;
    return result;
  } else {
    // All retries have failed
    console.error('Request failed', url);
    HTTPStatus.error++;
    throw new Error('Request failed', url);
  }
}

/**
 * Reads a sequence of responses from a HAL-Json endpoint
 * The endpoint is asked for data until there is no more data available (next = null)
 * A pagesize of 1000 is used to limit the number of successive requests
 * @param url
 * @returns {Promise<Array>}
 */
export async function readPaginatedData(url) {
  let next = url;
  let results = [];
  let page = 1;
  const pageSize = 1000;
  const concatParam = url.includes('?') ? '&' : '?';
  while (next) {
    try {
      const requestUrl = `${url}${concatParam}page=${page}&page_size=${pageSize}`;
      const response = await get(requestUrl);
      next = response.data._links.next.href;
      results = results.concat(response.data.results);
      page += 1;
    } catch (e) {
      next = null;
    }
  }
  return results;
}

/**
 * Requests data from a given url, resolving to response.data (default) or any other optionally specified value
 * @param url
 * @param resolve
 * @returns {Promise<*>}
 */
export async function readData(url, resolve = d => d.data) {
  const response = await get(url);
  return resolve(response);
}
