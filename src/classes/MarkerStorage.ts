import L, { LatLng } from 'leaflet';

export class MarkerStorage {
  static markers: { [key: string]: L.CircleMarker | L.CircleMarker[] } = {};

  static addMarker(latlng: LatLng, marker: L.CircleMarker) {
    const key = `${latlng.toString()}-${marker?.feature?.properties?.reference}`;

    if (MarkerStorage.markers[key] !== undefined) {
      console.warn(
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
