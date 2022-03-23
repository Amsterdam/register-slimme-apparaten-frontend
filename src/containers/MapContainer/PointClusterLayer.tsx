import React, { useEffect, useMemo, useRef } from 'react';
import { Feature, Point } from 'geojson';
import L, { DomEvent, LatLng } from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import { useMapInstance } from '@amsterdam/react-maps';
import { emptyFeatureCollection } from './hooks/useRetreiveMapDataAndLegend';
import { Sensor } from '../../classes/Sensor';
import { MarkerStorage } from '../../classes/MarkerStorage';

interface Props {
  mapData: Sensor[] | null;
  onItemSelected: (feature: Feature) => void;
  showSelectedMarker: boolean;
}

export function filterSensorsOnSameLocation(sensors: Sensor[]): Sensor[][] {
  const sensorsOnSameLocation: Sensor[][] = [];

  sensors.forEach((sensor) => {
    // Check if the current sensor was already added to the list of sensors on the same location.
    if (
      sensorsOnSameLocation
        .map((list) => list.some((s) => s.feature.properties?.reference === sensor.feature.properties?.reference))
        .filter(Boolean).length > 0
    ) {
      return;
    }

    // Find all sensors which have simmilar coordinates and a different reference.
    let otherSensorsOnSameLocation = sensors.filter(
      (s) =>
        s.feature.geometry.coordinates[0] === sensor.feature.geometry.coordinates[0] &&
        s.feature.geometry.coordinates[1] === sensor.feature.geometry.coordinates[1] &&
        s.feature.properties?.reference !== sensor.feature.properties?.reference,
    );

    // Add them to the list of sensors on the same location along with the current sensor
    if (otherSensorsOnSameLocation.length > 0) {
      sensorsOnSameLocation.push([sensor, ...otherSensorsOnSameLocation]);
    }
  });

  return sensorsOnSameLocation.filter(Boolean);
}

function createDefaultMarker(feature: Feature, latlng: LatLng) {
  const marker = L.circleMarker(latlng, {
    color: 'white',
    fillColor: feature?.properties?.color,
    stroke: true,
    fillOpacity: 1,
    radius: 8,
  });

  marker.feature = feature as Feature<Point, any>;

  MarkerStorage.addMarker(latlng, marker);

  return marker;
}

const PointClusterLayer: React.FC<Props> = ({ mapData, onItemSelected, showSelectedMarker }) => {
  const mapInstance = useMapInstance();
  const selectedMarkerRef = useRef<L.CircleMarker>();
  const activeLayer = useRef<L.GeoJSON>();

  useMemo(() => {
    if (!mapInstance || !mapData) return;

    const sensorsOnSameLocation = filterSensorsOnSameLocation(mapData);

    const fc = emptyFeatureCollection();
    // Add the features to the collection but filter all sensors found in the sensorsOnSameLocation array as those will be added differently.
    fc.features = mapData
      .filter(
        (sensor) =>
          !sensorsOnSameLocation.some((list) =>
            list.find((s) => s.feature.properties?.reference === sensor.feature.properties?.reference),
          ),
      )
      .map((s) => s.toFeature());

    activeLayer.current?.remove();

    const layer = L.geoJSON(fc, {
      onEachFeature: (feature: Feature, layer: L.Layer) => {
        layer.on('click', (e) => {
          DomEvent.stopPropagation(e);

          if (selectedMarkerRef.current) {
            selectedMarkerRef.current.remove();
          }

          selectedMarkerRef.current = L.circleMarker(
            { lat: feature?.properties?.latitude, lng: feature?.properties?.longitude },
            {
              color: 'red',
              fillColor: 'white',
              stroke: true,
              fillOpacity: 1,
              radius: 9,
              className: 'sr-highlighted-marker',
            },
          ).addTo(mapInstance);

          onItemSelected(feature);
        });
      },
      pointToLayer: (feature: Feature, latlng: L.LatLng) => {
        if (selectedMarkerRef.current) {
          selectedMarkerRef.current.remove();
        }

        const marker = createDefaultMarker(feature, latlng);

        return marker;
      },
    });
    layer.addTo(mapInstance);

    // Add markerClusterGroups for all sets of sensors on the same location.
    sensorsOnSameLocation.forEach((set) => {
      const overlappingSensors = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          return L.divIcon({
            className: 'sr-grouped-marker',
            iconSize: [21, 21],
            html: `<span>${cluster.getChildCount()}</span><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle fill="#019EED" cx="50" cy="50" r="50"/></svg>`,
          });
        },
      });

      set.forEach((sensor) => {
        overlappingSensors.addLayer(
          createDefaultMarker(
            sensor.feature,
            new LatLng(sensor.feature.geometry.coordinates[1], sensor.feature.geometry.coordinates[0]),
          ).on('click', (e) => {
            if (selectedMarkerRef.current) {
              selectedMarkerRef.current.remove();
            }

            selectedMarkerRef.current = L.circleMarker(
              new LatLng(sensor.feature.geometry.coordinates[1], sensor.feature.geometry.coordinates[0]),
              {
                color: 'red',
                fillColor: 'white',
                stroke: true,
                fillOpacity: 1,
                radius: 9,
                className: 'sr-highlighted-marker',
              },
            ).addTo(mapInstance);

            onItemSelected(sensor.feature);
          }),
        );
      });

      overlappingSensors.addTo(mapInstance);
    });

    activeLayer.current = layer;
  }, [mapInstance, mapData, onItemSelected]);

  useEffect(() => {
    if (!showSelectedMarker && selectedMarkerRef) {
      selectedMarkerRef.current?.remove();
    }
  }, [showSelectedMarker]);

  return <></>;
};

export default PointClusterLayer;
