/* eslint-disable */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const leaflet_1 = __importDefault(require("leaflet"));
const proj4_1 = __importDefault(require("proj4"));
exports.CRS_CONFIG = {
    RD: {
        code: 'EPSG:28992',
        projection: '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +' +
            'y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.3507326' +
            '76542563,-1.8703473836068,4.0812 +no_defs',
        transformation: {
            bounds: {
                topLeft: [-285401, 903401],
                bottomRight: [595401.92, 22598.08],
            },
        },
    },
    WGS84: {
        code: 'EPSG:4326',
        projection: '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    },
    EARTH_RADIUS: 6378137,
};
exports.proj4RD = proj4_1.default(exports.CRS_CONFIG.WGS84.code, exports.CRS_CONFIG.RD.projection);
/**
 * This method will return RD-coordinates (RD stands for "Rijksdriehoekscoördinaten") in the geodetic coordinate system
 * that is used at national level for the European Netherlands as a basis for geographical indications and files.
 * CRS stands for coordinate reference system, a term used by geographers to explain what the coordinates mean in a coordinate vector.
 *
 * @param maxZoom
 * @param zeroScale
 * @param scales
 */
const getCrsRd = (maxZoom = 16, zeroScale = 3440.64, scales = []) => {
    // eslint-disable-next-line no-const-assign,no-plusplus
    for (let i = 0; i <= maxZoom; i++) {
        scales.push(1 / (zeroScale * Math.pow(0.5, i)));
    }
    return Object.assign(Object.assign({}, leaflet_1.default.CRS.Simple), {
        code: exports.CRS_CONFIG.RD.code,
        infinite: false,
        projection: {
            project: (latlng) => {
                const [x, y] = exports.proj4RD.forward([latlng.lng, latlng.lat]);
                return new leaflet_1.default.Point(x, y);
            },
            unproject: (point) => {
                const [lng, lat] = exports.proj4RD.inverse([point.x, point.y]);
                return leaflet_1.default.latLng(lat, lng);
            },
            bounds: leaflet_1.default.bounds(exports.CRS_CONFIG.RD.transformation.bounds.topLeft, exports.CRS_CONFIG.RD.transformation.bounds.bottomRight),
            proj4def: exports.CRS_CONFIG.RD.projection,
        },
        transformation: new leaflet_1.default.Transformation(1, 285401.92, -1, 903401.92),
        distance: leaflet_1.default.CRS.Earth.distance,
        R: exports.CRS_CONFIG.EARTH_RADIUS,
        scale: (zoom) => {
            if (scales[zoom]) {
                return scales[zoom];
            }
            return 1 / (zeroScale * Math.pow(0.5, zoom));
        },
        zoom: (scale) => Math.log(1 / scale / zeroScale) / Math.log(0.5),
    });
};
exports.default = getCrsRd;
//# sourceMappingURL=getCrsRd.js.map