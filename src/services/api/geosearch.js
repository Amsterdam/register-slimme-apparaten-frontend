import _ from 'lodash';
import { readData } from '../datareader';
import { rdToWgs84 } from '../geojson';

const BASE_URL = 'https://api.data.amsterdam.nl/';
const TYPE_AHEAD = `${BASE_URL}typeahead?q=`;

export async function geoSearch(searchText) {
  let results = await readData(TYPE_AHEAD + searchText);
  results = results
    .filter((r) => ['Straatnamen', 'Gebieden'].includes(r.label))
    .map((r) => r.content);
  return _.flatten(results).map((r) => ({ ...r, searchText }));
}

export async function getBounds(searchResult) {
  const result = await readData(BASE_URL + searchResult.uri);
  const [x1, y1, x2, y2] = result.bbox;
  const p1 = rdToWgs84([x1, y1]);
  const p2 = rdToWgs84([x2, y2]);
  return [p1, p2];
}
