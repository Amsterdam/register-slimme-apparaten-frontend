import uniq from 'lodash/uniq';
import { OwnerType, PiOptions, SensorTypes } from '../utils/types';
import { Sensor } from './Sensor';

type CountType = { [key: string]: number };

export class SensorFilter {
  sensors: Sensor[];
  filteredSensors: Sensor[];
  sensorTypeFilter: string[];
  themeFilter: string[];
  ownerFilter: string[];
  piFilter: string[];

  sensorTypeCount: CountType;
  piCount: CountType;
  ownerCount: CountType;
  themeCount: CountType;

  constructor(
    sensors: Sensor[],
    filteredSensors: Sensor[] = sensors,
    sensorTypeFilter: string[] = [],
    themeFilter: string[] = [],
    ownerFilter: string[] = [],
    piFilter: string[] = [],
  ) {
    this.sensors = [...sensors];
    this.filteredSensors = filteredSensors;
    this.sensorTypeFilter = sensorTypeFilter;
    this.themeFilter = themeFilter;
    this.ownerFilter = ownerFilter;
    this.piFilter = piFilter;

    this.sensorTypeCount = this.countSensorTypes();
    this.themeCount = this.countThemes();
    this.piCount = this.countPi();
    this.ownerCount = this.countOwner();
  }

  filterTheme() {
    if (this.themeFilter.length === 0) {
      return this;
    }

    return this.filterdResult(this.filteredSensors.filter((s) => this.themeFilter.some((t) => s.hasTheme(t))));
  }

  filterSensorType() {
    if (this.sensorTypeFilter.length === 0) {
      return this;
    }

    return this.filterdResult(this.filteredSensors.filter((s) => this.sensorTypeFilter.some((t) => s.isSensorType(t))));
  }

  filterOwner() {
    if (this.ownerFilter.length === 2 || this.ownerFilter.length === 0) {
      return this;
    }

    return this.filterdResult(
      this.filteredSensors.filter(
        (s) =>
          (this.ownerFilter[0] === OwnerType.Gemeente && s.isOwnedByMunicipality()) ||
          (this.ownerFilter[0] === OwnerType.Other && !s.isOwnedByMunicipality()),
      ),
    );
  }

  filterPi() {
    if (this.piFilter.length === 2 || this.piFilter.length === 0) {
      return this;
    }

    return this.filterdResult(
      this.filteredSensors.filter(
        (s) =>
          (this.piFilter[0] === PiOptions.Ja && s.isCollectingPiData()) ||
          (this.piFilter[0] === PiOptions.Nee && !s.isCollectingPiData()),
      ),
    );
  }

  filter() {
    return this.filterSensorType().filterOwner().filterPi().filterTheme().count();
  }

  count() {
    this.sensorTypeCount = this.freshInstance().filterOwner().filterPi().filterTheme().countSensorTypes();
    this.ownerCount = this.freshInstance().filterSensorType().filterPi().filterTheme().countOwner();
    this.piCount = this.freshInstance().filterOwner().filterSensorType().filterTheme().countPi();
    this.themeCount = this.freshInstance().filterSensorType().filterPi().filterOwner().countThemes();

    return this;
  }

  countSensorTypes() {
    const otherTypes = Object.values(SensorTypes).filter((t) => !this.sensorTypeFilter.includes(t));

    const sensorTypeCount = otherTypes.reduce((prev: { [key: string]: number }, type) => {
      prev[type] = this.filteredSensors.filter((s) => s.isSensorType(type)).length;

      return prev;
    }, {});

    return sensorTypeCount;
  }

  countThemes() {
    const themes = uniq(this.sensors.map((s) => s.themes).flat());
    const otherThemes = themes.filter((t) => !this.themeFilter.includes(t));

    const themeCount = otherThemes.reduce((prev: { [key: string]: number }, theme) => {
      prev[theme] = this.filteredSensors.filter((s) => s.hasTheme(theme)).length;

      return prev;
    }, {});

    return themeCount;
  }

  countPi() {
    const piCount = {
      [PiOptions.Ja]: this.filteredSensors.filter((s) => s.isCollectingPiData()).length,
      [PiOptions.Nee]: this.filteredSensors.filter((s) => !s.isCollectingPiData()).length,
    };

    return piCount;
  }

  countOwner() {
    const ownerCount = {
      [OwnerType.Gemeente]: this.filteredSensors.filter((s) => s.isOwnedByMunicipality()).length,
      [OwnerType.Other]: this.filteredSensors.filter((s) => !s.isOwnedByMunicipality()).length,
    };

    return ownerCount;
  }

  /**
   * Create a new instance using the filtered list of sensors.
   *
   * @param sensors A list of (filtered) sensors
   * @returns A new instance of this class with the passed array of sensors plugged as the filtered sensors
   */
  filterdResult(sensors: Sensor[]) {
    return new SensorFilter(
      this.sensors,
      sensors,
      this.sensorTypeFilter,
      this.themeFilter,
      this.ownerFilter,
      this.piFilter,
    );
  }

  /**
   * Create a fresh instance of this class with with no filters applied.
   *
   * @returns A new instance with no filters applied.
   */
  freshInstance() {
    return new SensorFilter(
      this.sensors,
      this.sensors,
      this.sensorTypeFilter,
      this.themeFilter,
      this.ownerFilter,
      this.piFilter,
    );
  }
}
