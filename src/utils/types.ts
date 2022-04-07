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
  Mobiel = 'Vaste / mobiele sensoren',
}

export enum PiOptions {
  Ja = 'Ja',
  Nee = 'Nee',
}

export enum OwnerType {
  Gemeente = 'Gemeente Amsterdam',
  Other = 'Andere',
}

export enum MobileType {
  Mobiel = 'Mobiele sensor',
  Vast = 'Vaste sensor',
}

export type SortedResults = { [category: string]: { [type: string]: FeatureCollection | null } };
