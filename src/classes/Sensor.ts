import { Feature, GeoJsonProperties, Point } from 'geojson';
import { OwnerType, PiOptions } from '../utils/types';

export class Sensor {
  sensorType: string;
  themes: string[];
  organisation: string;
  containsPiData: PiOptions;
  feature: Feature<Point, GeoJsonProperties>;

  constructor(feature: Feature<Point, GeoJsonProperties>) {
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
