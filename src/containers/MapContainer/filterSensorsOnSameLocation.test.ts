import { Feature, GeoJsonProperties, Point } from 'geojson';
import { filterSensorsOnSameLocation } from './PointClusterLayer';
import sensors from '../../classes/__mockData__/sensors.json';
import { Sensor } from '../../classes/Sensor';

describe('filterSensorsOnSameLocation', () => {
  let sensorList: Sensor[] = [];
  beforeAll(() => {
    sensorList = sensors.map((s) => new Sensor(s.feature as Feature<Point, GeoJsonProperties>));
  });

  it('should return an empty list when passed an empty list', () => {
    expect(filterSensorsOnSameLocation([])).toEqual([]);
  });

  it('should return an empty list when no sensors are at the same location', () => {
    expect(filterSensorsOnSameLocation(sensorList)).toEqual([]);
  });

  it('should cluster sensors at the same location', () => {
    const newList = [...sensorList, new Sensor({ ...sensorList[1].feature, ...{ properties: { refrence: 'test' } } })];

    expect(filterSensorsOnSameLocation(newList)).toEqual([[newList[1], newList[8]]]);
  });
});
