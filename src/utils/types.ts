import { FeatureCollection } from 'geojson';

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
  category: string;
  className: string;
  layer: {
    features: any[]; // TODO: Better typing
    type: string;
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

export enum LegendCategories {
  'Sensor type' = 'Sensor type',
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
