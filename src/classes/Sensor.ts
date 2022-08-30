import { Feature, GeoJsonProperties, Point } from 'geojson';
import L, { LatLng, Layer } from 'leaflet';
import { OwnerType, PiOptions } from '../utils/types';

export class Sensor {
  sensorType: string;
  themes: string[];
  organisation: string;
  containsPiData: PiOptions;
  feature: Feature<Point, GeoJsonProperties>;
  regions: string[];
  projectsPaths: string[][];

  constructor(feature: Feature<Point, GeoJsonProperties>) {
    this.feature = feature;
    this.sensorType = feature.properties?.sensorType;
    this.themes = feature.properties?.themes;
    this.organisation = feature.properties?.organisation;
    this.containsPiData = feature.properties?.containsPiData;
    this.regions = feature.properties?.regions;
    this.projectsPaths = feature.properties?.projectPaths?.map((projects: string[]) =>
      projects.filter((project: string) => project !== OwnerType.Gemeente),
    );
  }

  isPartOfProject(project: string) {
    return this.projectsPaths?.map((path) => path.includes(project)).some((p) => p === true);
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

  isMobileSensor() {
    return this.regions?.length > 0;
  }

  toFeature() {
    return this.feature;
  }

  getLatLng() {
    return new LatLng(this.feature?.properties?.latitude, this.feature?.properties?.longitude);
  }

  getMarker(): Layer {
    const marker = this.isMobileSensor()
      ? L.marker(this.getLatLng(), {
          icon: L.divIcon({
            className: 'sr-mobile-marker',
            iconSize: [24, 24],
            html: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><polygon stroke="white" stroke-opacity="1" stroke-width="10" fill="${this.feature.properties?.color}" fill-opacity="1" fill-rule="evenodd" points="50 15, 100 100, 0 100"/></svg>`,
          }),
        })
      : L.circleMarker(this.getLatLng(), {
          color: 'white',
          fillColor: this.feature.properties?.color,
          stroke: true,
          fillOpacity: 1,
          radius: 8,
        });

    // @ts-ignore
    marker.feature = this.feature as Feature<Point, any>;

    return marker;
  }
}
