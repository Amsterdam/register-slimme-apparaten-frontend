import uniq from 'lodash/uniq';
import { LegendCategories, MobileType, OwnerType, PiOptions, SensorTypes } from '../utils/types';
import { Sensor } from './Sensor';

type CountType = { [key: string]: number };

const mapLegendToProperties: { [category: string]: 'themeCount' | 'piCount' | 'ownerCount' | 'mobileCount' } = {
  [LegendCategories.Thema]: 'themeCount',
  [LegendCategories['Verwerkt persoonsgegevens']]: 'piCount',
  [LegendCategories.Eigenaar]: 'ownerCount',
  [LegendCategories.Mobiel]: 'mobileCount',
};

export class SensorFilter {
  sensors: Sensor[];
  filteredSensors: Sensor[];
  sensorTypeFilter: string[];
  themeFilter: string[];
  ownerFilter: string[];
  piFilter: string[];
  mobileFilter: string[];
  projectFilter: string[];

  sensorTypeCount: CountType;
  piCount: CountType;
  ownerCount: CountType;
  themeCount: CountType;
  mobileCount: CountType;
  projectsCount: CountType;

  constructor(
    sensors: Sensor[],
    filteredSensors: Sensor[] = sensors,
    sensorTypeFilter: string[] = [],
    themeFilter: string[] = [],
    ownerFilter: string[] = [],
    piFilter: string[] = [],
    mobileFilter: string[] = [],
    projectFilter: string[] = [],
  ) {
    this.sensors = [...sensors];
    this.filteredSensors = filteredSensors;
    this.sensorTypeFilter = sensorTypeFilter;
    this.themeFilter = themeFilter;
    this.ownerFilter = ownerFilter;
    this.piFilter = piFilter;
    this.mobileFilter = mobileFilter;
    this.projectFilter = projectFilter;

    this.sensorTypeCount = this.countSensorTypes();
    this.themeCount = this.countThemes();
    this.piCount = this.countPi();
    this.ownerCount = this.countOwner();
    this.mobileCount = this.countMobile();
    this.projectsCount = this.countProjects();
  }

  filterTheme() {
    if (this.themeFilter.length === 0) {
      return this;
    }

    return this.getFilteredResult(this.filteredSensors.filter((s) => this.themeFilter.some((t) => s.hasTheme(t))));
  }

  filterSensorType() {
    if (this.sensorTypeFilter.length === 0) {
      return this;
    }

    return this.getFilteredResult(
      this.filteredSensors.filter((s) => this.sensorTypeFilter.some((t) => s.isSensorType(t))),
    );
  }

  filterOwner() {
    if (this.ownerFilter.length === 2 || this.ownerFilter.length === 0) {
      return this;
    }

    return this.getFilteredResult(
      this.filteredSensors.filter(
        (s) =>
          (this.ownerFilter[0] === OwnerType.Gemeente && s.isOwnedByMunicipality()) ||
          (this.ownerFilter[0] === OwnerType.Other && !s.isOwnedByMunicipality()),
      ),
    );
  }

  filterProject() {
    if (this.projectFilter.length === 0) {
      return this;
    }

    return this.getFilteredResult(
      this.filteredSensors.filter((s) => this.projectFilter.some((t) => s.isPartOfProject(t))),
    );
  }

  filterMobile() {
    if (this.mobileFilter.length === 2 || this.mobileFilter.length === 0) {
      return this;
    }

    return this.getFilteredResult(
      this.filteredSensors.filter(
        (s) =>
          (this.mobileFilter[0] === MobileType.Mobiel && s.isMobileSensor()) ||
          (this.mobileFilter[0] === MobileType.Vast && !s.isMobileSensor()),
      ),
    );
  }

  filterPi() {
    if (this.piFilter.length === 2 || this.piFilter.length === 0) {
      return this;
    }

    return this.getFilteredResult(
      this.filteredSensors.filter(
        (s) =>
          (this.piFilter[0] === PiOptions.Ja && s.isCollectingPiData()) ||
          (this.piFilter[0] === PiOptions.Nee && !s.isCollectingPiData()),
      ),
    );
  }

  filter() {
    let res = this;
    SensorFilter.getFilterFunctions().forEach((f) => {
      // @ts-ignore
      res = res[f]();
    });

    return res.count();
  }

  static getFilterFunctions() {
    return Object.getOwnPropertyNames(SensorFilter.prototype).filter(
      (p) => p.substring(0, 6) === 'filter' && p.length > 6,
    );
  }

  getCountForCategory(category: LegendCategories) {
    if (category === LegendCategories.Eigenaar) {
      return {
        ...this.ownerCount,
        ...this.projectsCount,
      };
    } else {
      return this[mapLegendToProperties[category]];
    }
  }

  /**
   * Runs all filter* functions except 'excludedFilter' on the current instance. After filtering the 'countFunction' is called.
   *
   * @param excludedFilter
   * @param countFunction
   * @returns
   */
  getTypeCount(excludedFilter: string, countFunction: string): CountType {
    let res = this;
    SensorFilter.getFilterFunctions()
      .filter((f) => f !== excludedFilter)
      .forEach((f) => {
        // @ts-ignore
        res = res[f]();
      });

    // @ts-ignore
    return res[countFunction]();
  }

  count() {
    this.sensorTypeCount = this.getTypeCount('filterSensorType', 'countSensorTypes');
    this.ownerCount = this.getTypeCount('filterSensorType', 'countSensorTypes');
    this.piCount = this.getTypeCount('filterPi', 'countPi');
    this.themeCount = this.getTypeCount('filterThemes', 'countThemes');
    this.mobileCount = this.getTypeCount('filterMobile', 'countMobile');
    this.projectsCount = this.getTypeCount('filterProject', 'countProjects');

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

    const themeCount = themes.reduce((prev: { [key: string]: number }, theme) => {
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

  countProjects() {
    const projectOptions = uniq(this.sensors.map((s) => s?.projectsPaths?.flat()).flat());

    const projectCount = projectOptions.reduce((prev: { [key: string]: number }, project) => {
      prev[project] = this.filteredSensors.filter((s) => s.isPartOfProject(project)).length;

      return prev;
    }, {});

    return projectCount;
  }

  countMobile() {
    const mobileCount = {
      [MobileType.Mobiel]: this.filteredSensors.filter((s) => s.isMobileSensor()).length,
      [MobileType.Vast]: this.filteredSensors.filter((s) => !s.isMobileSensor()).length,
    };

    return mobileCount;
  }

  /**
   * Create a new instance using the filtered list of sensors.
   *
   * @param sensors A list of (filtered) sensors
   * @returns A new instance of this class with the passed array of sensors plugged as the filtered sensors
   */
  getFilteredResult(sensors: Sensor[]) {
    return new SensorFilter(
      this.sensors,
      sensors,
      this.sensorTypeFilter,
      this.themeFilter,
      this.ownerFilter,
      this.piFilter,
      this.mobileFilter,
      this.projectFilter,
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
      this.mobileFilter,
      this.projectFilter,
    );
  }
}
