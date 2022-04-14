import L, { LatLng, Layer } from 'leaflet';

export class MarkerStorage {
  static markers: { [key: string]: Layer | Layer[] } = {};

  static addMarker(latlng: LatLng, marker: Layer) {
    // @ts-ignore
    const key = `${latlng.toString()}-${marker?.feature?.properties?.reference}`;

    if (MarkerStorage.markers[key] !== undefined) {
      console.warn(
        // @ts-ignore
        `Wanted to add marker ${marker?.feature?.properties?.reference} to ${key} but found a marker already.`,
      );

      if (Array.isArray(MarkerStorage.markers[key])) {
        /* @ts-ignore */
        MarkerStorage.markers[key].push(marker);
      } else {
        /* @ts-ignore */
        MarkerStorage.markers[key] = [MarkerStorage.markers[key], marker];
      }
    } else {
      MarkerStorage.markers[key] = marker;
    }
  }

  static getMarkers() {
    return MarkerStorage.markers;
  }
}
