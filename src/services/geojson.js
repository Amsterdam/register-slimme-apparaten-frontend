import L from "leaflet";
import proj4 from "proj4";
import "proj4leaflet";

/**
 * The code is this module has been copied from Atlas
 * Unfortunately the code contains little or no comment.
 * Also it contains a lot of undocumented magic constants
 * No effort has been made to compensate for the lack of documentation
 * The code is included as is
 */

/**
 * rd coordinate system configuration
 */
const config = {
  rd: {
    code: "EPSG:28992",
    projection:
      "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +" +
      "y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.3507326" +
      "76542563,-1.8703473836068,4.0812 +no_defs",
    transformation: {
      resolutions: [
        3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21,
        0.105, 0.0525,
      ],
      bounds: [
        [-285401.92, 22598.08],
        [595301.9199999999, 903301.9199999999],
      ],
      origin: [-285401.92, 22598.08],
    },
  },
  wgs84: {
    code: "EPSG:4326",
    projection: "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",
  },
  earthRadius: 6378137, // The radius in meters
};

const rdSettings = config.rd;
rdSettings.transformation.bounds = L.bounds.apply(null, rdSettings.transformation.bounds);

const rd = new L.Proj.CRS(rdSettings.code, rdSettings.projection, rdSettings.transformation);

rd.distance = L.CRS.Earth.distance;
rd.R = config.earthRadius;

/**
 * Pricision decimals used to convert floats to fixed decimal floats
 * Primary use is to allow for automated testing on different platforms with different precisions
 * This can also be solved in the tests, it is easier to do it here
 * 6 digit coordinate precision is a very acceptable precision for the use in a dashboard that uses
 * the coordinates to provide for an outline of the geometry of the gebied, wijk, buurt
 * @type {number}
 */
const PRECISION_DECIMALS = 6;
/**
 * Convert a number to a number with a fixed number of decimals
 * Example for 2 decimals:
 * 1.005 => Round(1.005e2)e-2 (1.005 => 1.01)
 * Note that (1.005 * 10e2) / 10e2 does not work (1.005 => 1)
 * @param x
 * @param decimals
 * @returns {number}
 */
export const toPrecision = (x, decimals = PRECISION_DECIMALS) =>
  // @ts-ignore
  Number(Math.round(`${x}e${decimals}`) + `e-${decimals}`);

/**
 * Converts rd coordinates to wgs84 coordinates
 * @param rdCoordinates [x, y]
 * @returns {*[]}
 */
export function rdToWgs84(rdCoordinates) {
  const wgs84Coordinates = proj4(config.rd.projection, config.wgs84.projection, [rdCoordinates[0], rdCoordinates[1]]);
  return [wgs84Coordinates[0], wgs84Coordinates[1]].map((x) => toPrecision(x));
}

/**
 * Converts a rd polygon to a polygon with wgs84 coordinates
 * @param geometry
 * @returns {{type: string, coordinates: *[]}}
 */
export function rdPolygonToWgs84(geometry) {
  if (geometry.type !== "Polygon") {
    // eslint-disable-next-line no-console
    console.error('Error in geometry type, "Polygon" was expected', geometry.type);
    return;
  }

  // {
  //   'type': 'Polygon',
  //   'coordinates': [
  //         [-99.028, 46.985], [-99.028, 50.979],
  //         [-82.062, 50.979], [-82.062, 47.002],
  //         [-99.028, 46.985]
  //       ]
  // }

  return {
    type: "Polygon",
    coordinates: [geometry.coordinates[0].map((rdCoordinate) => rdToWgs84(rdCoordinate))],
  };
}
