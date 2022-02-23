import { Feature } from 'geojson';
import { OwnerType, PiOptions, SensorTypes } from '../utils/types';
import { Sensor } from './Sensor';
import { SensorFilter } from './SensorFilter';
import sensors from './__mockData__/sensors.json';

describe('SensorenFilter', () => {
  describe('Filter', () => {
    let sensorList: Sensor[] = [];
    beforeAll(() => {
      sensorList = sensors.map((s) => new Sensor(s.feature as Feature));
    });

    it('should give the right results with no filters', () => {
      const filter = new SensorFilter(sensorList);

      expect(filter.filter().filteredSensors).toEqual(sensorList);
    });

    it('should give the right results when filtering for sensortype', () => {
      // "Optische / camera sensor"
      // "Positie- of verplaatsingsensor"

      const filter = new SensorFilter(sensorList, sensorList, [SensorTypes.Optische]);

      expect(filter.filter().filteredSensors).toEqual(sensorList.filter((s) => s.isSensorType(SensorTypes.Optische)));

      const otherFilter = new SensorFilter(sensorList, sensorList, [SensorTypes.Positie]);

      expect(otherFilter.filter().filteredSensors).toEqual(
        sensorList.filter((s) => s.isSensorType(SensorTypes.Positie)),
      );
    });

    it('should give the right results when filtering for PI collection', () => {
      const filter = new SensorFilter(sensorList, sensorList, [], [], [], [PiOptions.Ja]);

      expect(filter.filter().filteredSensors).toEqual(sensorList.filter((s) => s.isCollectingPiData()));

      const otherFilter = new SensorFilter(sensorList, sensorList, [], [], [], [PiOptions.Nee]);

      expect(otherFilter.filter().filteredSensors).toEqual(sensorList.filter((s) => !s.isCollectingPiData()));
    });

    it('should give the right results when filtering for owner', () => {
      const filter = new SensorFilter(sensorList, sensorList, [], [], [OwnerType.Gemeente]);

      expect(filter.filter().filteredSensors).toEqual(sensorList.filter((s) => s.isOwnedByMunicipality()));

      const otherFilter = new SensorFilter(sensorList, sensorList, [], [], [OwnerType.Other]);

      expect(otherFilter.filter().filteredSensors).toEqual(sensorList.filter((s) => !s.isOwnedByMunicipality()));
    });

    it('should give the right results when filtering for theme', () => {
      const filter = new SensorFilter(sensorList, sensorList, [], ['Veiligheid: bewakings- en/of beveiligingscamera']);

      expect(filter.filter().filteredSensors).toEqual(
        sensorList.filter((s) => s.hasTheme('Veiligheid: bewakings- en/of beveiligingscamera')),
      );

      const otherFilter = new SensorFilter(sensorList, sensorList, [], ['Veiligheid: gezondheid'], [], []);

      expect(otherFilter.filter().filteredSensors).toEqual(
        sensorList.filter((s) => s.hasTheme('Veiligheid: gezondheid')),
      );
    });

    it('should give the right results when combining filters', () => {
      const filter = new SensorFilter(sensorList, sensorList, [SensorTypes.Optische], [], [], [PiOptions.Ja]);

      expect(filter.filter().filteredSensors).toEqual(
        sensorList.filter((s) => s.isSensorType(SensorTypes.Optische) && s.isCollectingPiData()),
      );

      const otherFilter = new SensorFilter(sensorList, sensorList, [], ['Veiligheid: gezondheid'], [], [PiOptions.Nee]);

      expect(otherFilter.filter().filteredSensors).toEqual(
        sensorList.filter((s) => s.hasTheme('Veiligheid: gezondheid') && !s.isCollectingPiData()),
      );
    });
  });
});
