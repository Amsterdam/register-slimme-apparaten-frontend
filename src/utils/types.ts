import { Feature, FeatureCollection } from 'geojson';
import uniq from 'lodash/uniq';

/**
 * Defines a general ActionType to be used with the reducers
 */
export interface ActionType {
  type: string;
  payload: string | number | string[] | SearchResult[] | LayerType[] | ItemType | null;
}

export interface SearchResult {
  id: string;
  name: string;
}

export interface LayerType {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
}

export interface IntermediateLayer {
  layer: {
    features: any[]; // TODO: Better typing
  };
  name: string;
}

export interface Item {
  category?: string[];
  contact?: string;
  geometry: { type: string; coordinates: number[] };
  id?: number;
  latitude?: number;
  longitude?: number;
  organisation?: string;
  privacy?: string;
  properties: any;
  soort?: string;
  type: string;
  color: string;
  containsPiData: boolean;
  sensorType: SensorTypes;
}

export interface ItemType {
  id: number;
  name?: string;
  soort: string;
  category: string;
  privacy?: string;
  item: Item;
  contact: string;
  organisation?: string;
}

// Beacon -> Aanwezigheid

export enum SensorTypes {
  Aanwezigheid = 'Aanwezigheid of nabijheidsensor',
  Temperatuursensor = 'Temperatuursensor',
  Dichtheidssensor = 'Dichtheidssensor',
  Druksensor = 'Druksensor',
  Positie = 'Positie- of verplaatsingsensor',
  Vloeistof = 'Vloeistof- en gasstroomsensor',
  Electriciteitssensor = 'Electriciteitssensor',
  Chemiesensor = 'Chemiesensor',
  Klimaatsensor = 'Klimaatsensor',
  Geluidsensor = 'Geluidsensor',
  Optische = 'Optische / camera sensor',
}

export const mapSensorTypeToColor: { [key: string]: string } = {
  [SensorTypes.Aanwezigheid]: '#4C4C4C',
  [SensorTypes.Temperatuursensor]: '#B4B4B4',
  [SensorTypes.Dichtheidssensor]: '#EC0100',
  [SensorTypes.Druksensor]: '#004698',
  [SensorTypes.Positie]: '#E50081',
  [SensorTypes.Vloeistof]: '#A00178',
  [SensorTypes.Electriciteitssensor]: ' #FFC815',
  [SensorTypes.Chemiesensor]: '#019EED',
  [SensorTypes.Klimaatsensor]: '#ff9000',
  [SensorTypes.Geluidsensor]: '#BED200',
  [SensorTypes.Optische]: '#01A03C',
};

export enum LegendCategories {
  'Sensor type' = 'Sensortype',
  Eigenaar = 'Eigenaar',
  'Verwerkt persoonsgegevens' = 'Verwerkt persoonsgegevens',
  Thema = 'Thema',
}

export enum PiOptions {
  Ja = 'Ja',
  Nee = 'Nee',
}

export enum OwnerType {
  Gemeente = 'Gemeente Amsterdam',
  Other = 'Andere',
}

export type SortedResults = { [category: string]: { [type: string]: FeatureCollection | null } };

export class Sensor {
  sensorType: string;
  themes: string[];
  organisation: string;
  containsPiData: PiOptions;
  feature: Feature;

  constructor(feature: Feature) {
    this.feature = feature;
    this.sensorType = feature.properties?.sensorType;
    this.themes = feature.properties?.themes;
    this.organisation = feature.properties?.organisation;
    this.containsPiData = feature.properties?.containsPiData;
  }

  hasTheme(theme: string) {
    return this.themes?.includes(theme);
  }

  isSensorType(type: string) {
    return this.sensorType === type;
  }

  isOwnedByMunicipality() {
    return this.organisation.toLocaleLowerCase().trim() === OwnerType.Gemeente.toLocaleLowerCase().trim();
  }

  isCollectingPiData() {
    return this.containsPiData;
  }

  toFeature() {
    return this.feature;
  }
}

type CountType = { [key: string]: number } | null;
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
    filteredSensors: Sensor[],
    sensorTypeFilter: string[],
    themeFilter: string[],
    ownerFilter: string[],
    piFilter: string[],
  ) {
    this.sensors = sensors;
    this.filteredSensors = filteredSensors;
    this.sensorTypeFilter = sensorTypeFilter;
    this.themeFilter = themeFilter;
    this.ownerFilter = ownerFilter;
    this.piFilter = piFilter;

    this.sensorTypeCount = sensors.reduce((prev: { [key: string]: number }, curr) => {
      if (!prev[curr.sensorType]) {
        prev[curr.sensorType] = 0;
      }

      prev[curr.sensorType] += 1;

      return prev;
    }, {});

    this.themeCount = sensors.reduce((prev: { [key: string]: number }, sensor) => {
      sensor.themes.forEach((t) => {
        if (!prev[t]) {
          prev[t] = 0;
        }

        prev[t] += 1;
      });

      return prev;
    }, {});

    this.piCount = {
      [PiOptions.Ja]: sensors.filter((s) => s.isCollectingPiData()).length,
      [PiOptions.Nee]: sensors.filter((s) => !s.isCollectingPiData()).length,
    };

    this.ownerCount = {
      [OwnerType.Gemeente]: sensors.filter((s) => s.isOwnedByMunicipality()).length,
      [OwnerType.Other]: sensors.filter((s) => !s.isOwnedByMunicipality()).length,
    };
  }

  filterTheme() {
    if (this.themeFilter.length === 0) {
      return this;
    }

    return this.filterdResult(
      this.filteredSensors.filter((s) => this.themeFilter.some((t) => s.hasTheme(t))),
    ).countSensorTypes();
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
    ).countSensorTypes();
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
    ).countSensorTypes();
  }

  filter() {
    return this.filterOwner().filterPi().filterSensorType().filterTheme();
  }

  countSensorTypes() {
    const otherTypes = Object.values(SensorTypes).filter((t) => !this.sensorTypeFilter.includes(t));

    this.sensorTypeCount = otherTypes.reduce((prev: { [key: string]: number }, type) => {
      prev[type] = this.sensors.filter((s) => s.isSensorType(type)).length;

      return prev;
    }, {});

    console.log(this.sensorTypeCount);

    return this;
  }

  countThemes() {
    const themes = uniq(this.sensors.map((s) => s.themes).flat());
    const otherThemes = console.log(this.themeCount);

    return this;
  }

  countPi() {
    this.piCount = {
      [PiOptions.Ja]: this.sensors.filter((s) => s.isCollectingPiData()).length,
      [PiOptions.Nee]: this.sensors.filter((s) => !s.isCollectingPiData()).length,
    };

    console.log(this.piCount);

    return this;
  }

  countOwner() {
    this.ownerCount = {
      [OwnerType.Gemeente]: this.sensors.filter((s) => s.isOwnedByMunicipality()).length,
      [OwnerType.Other]: this.sensors.filter((s) => !s.isOwnedByMunicipality()).length,
    };

    console.log(this.ownerCount);

    return this;
  }

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
}
