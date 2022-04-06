import React, { useEffect, useMemo, useRef } from 'react';
import { Feature, Point, GeoJsonProperties } from 'geojson';
import L, { DomEvent } from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import { useMapInstance } from '@amsterdam/react-maps';
import { emptyFeatureCollection } from './hooks/useRetreiveMapDataAndLegend';
import { Sensor } from '../../classes/Sensor';
import { MarkerStorage } from '../../classes/MarkerStorage';
import { useNavigate } from 'react-router-dom';

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

function createDefaultMarker(sensor: Sensor, addToList: boolean) {
  const marker = sensor.getMarker();

  if (addToList) {
    MarkerStorage.addMarker(sensor.getLatLng(), marker);
  }

  return marker;
}

function createSelectedMarker(feature: Feature) {
  return L.circleMarker(
    { lat: feature?.properties?.latitude, lng: feature?.properties?.longitude },
    {
      color: 'red',
      fillColor: 'white',
      stroke: true,
      fillOpacity: 1,
      radius: 11,
      className: 'sr-highlighted-marker',
    },
  );
}

const PointClusterLayer: React.FC<Props> = ({ mapData, onItemSelected, showSelectedMarker }) => {
  const mapInstance = useMapInstance();
  const navigate = useNavigate();
  const selectedMarkerRef = useRef<L.CircleMarker>();
  const activeLayer = useRef<L.GeoJSON>();
  const firstRun = useRef(true);

  useMemo(() => {
    if (!mapInstance || !mapData || mapData.length === 0) return;

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
      onEachFeature: (feature: Feature<Point, GeoJsonProperties>, layer: L.Layer) => {
        layer.on('click', (e) => {
          DomEvent.stopPropagation(e);

          if (selectedMarkerRef.current) {
            selectedMarkerRef.current.remove();
          }

          selectedMarkerRef.current = createSelectedMarker(feature).addTo(mapInstance);

          navigate(
            `/?sensor=${encodeURIComponent(
              JSON.stringify([feature?.properties?.latitude, feature?.properties?.longitude]),
            )}&reference=${feature.properties?.reference}`,
          );

          onItemSelected(feature);
        });
      },
      pointToLayer: (feature: Feature<Point, GeoJsonProperties>) => {
        if (selectedMarkerRef.current) {
          selectedMarkerRef.current.remove();
        }

        const marker = createDefaultMarker(new Sensor(feature), firstRun.current);

        return marker;
      },
    });
    layer.addTo(mapInstance);

    // Add markerClusterGroups for all sets of sensors on the same location.
    sensorsOnSameLocation.forEach((set) => {
      let c: null | L.MarkerCluster = null;
      const overlappingSensors = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          // A workaround to get a reference to the ClusterMarker
          c = cluster;
          return L.divIcon({
            className: 'sr-grouped-marker',
            iconSize: [21, 21],
            html: `<span>${cluster.getChildCount()}</span><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle fill="#019EED" cx="50" cy="50" r="50"/></svg>`,
          });
        },
      });

      set.forEach((sensor) => {
        overlappingSensors.addLayer(
          createDefaultMarker(sensor, firstRun.current).on('click', (e) => {
            if (selectedMarkerRef.current) {
              selectedMarkerRef.current.remove();
            }

            selectedMarkerRef.current = createSelectedMarker(sensor.feature)
              .addTo(mapInstance)
              .on('click', () => {
                if (c) {
                  selectedMarkerRef?.current?.remove();
                  c.spiderfy();
                }
              });

            navigate(
              `/?sensor=${encodeURIComponent(
                JSON.stringify([sensor.feature.geometry.coordinates[1], sensor.feature.geometry.coordinates[0]]),
              )}&reference=${sensor.feature.properties?.reference}`,
            );

            onItemSelected(sensor.feature);
          }),
        );
      });

      overlappingSensors.addTo(mapInstance);
    });

    activeLayer.current = layer;
    firstRun.current = false;
  }, [mapInstance, mapData, onItemSelected, navigate]);

  useEffect(() => {
    if (!showSelectedMarker && selectedMarkerRef) {
      selectedMarkerRef.current?.remove();
    }
  }, [showSelectedMarker]);

  return <></>;
};

export default PointClusterLayer;
