/* eslint-disable */

import L from 'leaflet';
import 'leaflet.markercluster';

import categories, { CAMERA_TOEZICHTSGEBIED } from '../static/categories';

/* eslint-disable no-unused-vars */
// Import marker icons so Webpack adds them as separate files instead of inlining them
import '../../public/images/icon-camera-gebied@3x.png';
import '../../public/images/icon-camera@3x.png';
import '../../public/images/icon-beacon@3x.png';
import '../../public/images/icon-sensor@3x.png';
import '../../public/images/icon-laadpaal@3x.png';
import '../../public/images/icon-verkeer@3x.png';
import '../../public/images/icon-lantaarn@3x.png';
/* eslint-enable no-unused-vars */

const markerOptions = {
  iconSize: [23, 23],
  iconAnchor: [8, 15],
  popupAnchor: [-3, -76],
};

export const HIGHLIGHT_CLASS = 'active-element';

let activeMarker;
let markerHighlight;
let areaHighlightLayer;

let markerGroup;

export function getMarkerCategory(device) {
  return categories[Object.keys(categories).find(mt => mt === device.categories[0])];
}

function getMarkerIcon(marker) {
  const iconUrl = categories[marker.categories[0]].iconUrl;
  return L.icon({
    ...markerOptions,
    iconUrl,
  });
}

export function toggleElement(map, key) {
  categories[key].enabled = !categories[key].enabled;
  let layer = categories[key].layer;
  if (layer) {
    if (categories[key].isClustered) {
      // markers are clustered in marker group
      if (categories[key].enabled) {
        markerGroup.addLayer(layer);
      } else {
        markerGroup.removeLayer(layer);
      }
    } else {
      if (categories[key].enabled) {
        map.addLayer(layer);
      } else {
        map.removeLayer(layer);
      }
    }
  }
}

export const removeCurrentHighlight = map => {
  if (markerHighlight) {
    // Point highlight
    map.removeLayer(markerHighlight);
  }

  if (areaHighlightLayer) {
    const classList = areaHighlightLayer.getElement().classList;
    if (classList && classList.remove) {
      classList.remove(HIGHLIGHT_CLASS);
    }
  }
};

export function showMarkers(map, markers, onClick) {
  const showInfo = (event, loc) => {
    if (activeMarker) {
      activeMarker._icon.classList.remove('highlight');
    }

    const { sourceTarget } = event;
    activeMarker = sourceTarget;
    activeMarker._icon.classList.add('highlight');

    onClick(loc);
  };

  markerGroup = L.markerClusterGroup({
    disableClusteringAtZoom: 16,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: false,
  });

  const clusterCategories = Object.entries(categories).filter(([, value]) => value.isClustered);
  for (const [id] of clusterCategories) {
    const layer = L.featureGroup();
    markers
      .filter(marker => marker.categories[0] === id)
      .forEach(marker =>
        L.marker([marker.latitude, marker.longitude], {
          icon: getMarkerIcon(marker),
        })
          .addTo(layer)
          .once('add', event => {
            const { sourceTarget } = event;

            if (activeMarker && sourceTarget._latlng === activeMarker._latlng) {
              activeMarker._icon.classList.add('highlight');
            }
            return this;
          })
          .once('remove', event => {
            const { sourceTarget } = event;

            if (activeMarker && sourceTarget._latlng === activeMarker._latlng) {
              activeMarker = undefined;
            }
            return this;
          })
          .on('click', event => showInfo(event, marker))
      );
    categories[id].layer = layer;
    categories[id].enabled = true;
    markerGroup.addLayer(layer);
  }

  map.addLayer(markerGroup);
  return markerGroup;
}

export function showAreas(map, geojson, onClickCallback) {
  const onClick = event => {
    removeCurrentHighlight(map);
    areaHighlightLayer = event.layer;

    const classList = areaHighlightLayer.getElement().classList;
    if (classList && classList.add) {
      classList.add(HIGHLIGHT_CLASS);
    }

    onClickCallback(event.sourceTarget.feature);
  };

  const layer = L.Proj.geoJson(geojson, { className: 'camera-area' });
  layer.on('click', onClick);
  map.addLayer(layer);
  categories[CAMERA_TOEZICHTSGEBIED].layer = layer;
  return layer;
}
