import { Feature, Point, GeoJsonProperties } from 'geojson';
import { SensorTypes } from '../utils/types';
import { Sensor } from './Sensor';
import sensors from './__mockData__/sensors.json';

describe('Sensor', () => {
  it('should initialize the class properties in the right way', () => {
    const s = new Sensor(sensors[0].feature as Feature<Point, GeoJsonProperties>);

    expect(s.isCollectingPiData()).toEqual(true);
    expect(s.isOwnedByMunicipality()).toEqual(false);
    expect(s.themes).toEqual(sensors[0].themes);
    expect(s.isSensorType(SensorTypes.Optische)).toEqual(true);

    const s2 = new Sensor(sensors[6].feature as Feature<Point, GeoJsonProperties>);

    expect(s2.isCollectingPiData()).toEqual(false);
    expect(s2.isOwnedByMunicipality()).toEqual(false);
    expect(s2.themes).toEqual(sensors[6].themes);
    expect(s2.isSensorType(SensorTypes.Optische)).toEqual(false);
    expect(s2.isSensorType(SensorTypes.Positie)).toEqual(true);

    const s3 = new Sensor(sensors[7].feature as Feature<Point, GeoJsonProperties>);

    expect(s3.isCollectingPiData()).toEqual(false);
    expect(s3.isOwnedByMunicipality()).toEqual(true);
    expect(s3.themes).toEqual(sensors[7].themes);
    expect(s3.isSensorType(SensorTypes.Optische)).toEqual(false);
    expect(s3.isSensorType(SensorTypes.Geluidsensor)).toEqual(true);
  });
});
