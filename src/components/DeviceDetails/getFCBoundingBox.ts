import { FeatureCollection, Polygon } from 'geojson';

export function getFCBoundingBox(featureCollection: FeatureCollection<Polygon, any>): [number, number][] {
  // Get the coordinates of all features in a single list.
  const listOfPoints = featureCollection.features.map((f) => f.geometry.coordinates.flat()).flat();

  // The FeatureCollection stores latitudes and logitudes as follows:
  // long: (index: 0)
  // lat: (index: 1)

  // Sort all coordinates by latitude
  const sortedByLat = [...listOfPoints].sort((a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] === b[1]) {
      return 0;
    }

    return 1;
  });

  // Same but with longitude
  const sortedByLng = [...listOfPoints].sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] === b[0]) {
      return 0;
    }

    return 1;
  });

  const smallestLat = sortedByLat[0];
  const smallestLng = sortedByLng[0];

  const largestLat = sortedByLat[listOfPoints.length - 1];
  const largestLng = sortedByLng[listOfPoints.length - 1];

  // Return a LatLng bounding box which can be used in Leaflet.
  return [
    [smallestLat[1], smallestLng[0]],
    [largestLat[1], largestLng[0]],
  ];
}
