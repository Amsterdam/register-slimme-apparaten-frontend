import React, { useMemo, useRef } from 'react';
import { Feature } from 'geojson';
import L, { DomEvent, LatLng } from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import { useMapInstance } from '@amsterdam/react-maps';
import { emptyFeatureCollection } from './hooks/useRetreiveMapDataAndLegend';
import { Sensor } from '../../classes/Sensor';

interface Props {
  mapData: Sensor[] | null;
  onItemSelected: (feature: Feature) => void;
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

    let otherSensorsOnSameLocation = sensors.filter(
      (s) =>
        s.feature.geometry.coordinates[0] === sensor.feature.geometry.coordinates[0] &&
        s.feature.geometry.coordinates[1] === sensor.feature.geometry.coordinates[1] &&
        s.feature.properties?.reference !== sensor.feature.properties?.reference,
    );
    if (otherSensorsOnSameLocation.length > 0) {
      sensorsOnSameLocation.push([sensor, ...otherSensorsOnSameLocation]);
    }
  });

  return sensorsOnSameLocation.filter(Boolean);
}

const PointClusterLayer: React.FC<Props> = ({ mapData, onItemSelected }) => {
  const mapInstance = useMapInstance();
  const markerRef = useRef<L.CircleMarker>();
  const activeLayer = useRef<L.GeoJSON>();

  useMemo(() => {
    if (!mapInstance || !mapData) return;

    const sensorsOnSameLocation = filterSensorsOnSameLocation(mapData);

    const fc = emptyFeatureCollection();
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

          if (markerRef.current) {
            markerRef.current.remove();
          }

          markerRef.current = L.circleMarker(
            { lat: feature?.properties?.latitude, lng: feature?.properties?.longitude },
            {
              color: 'red',
              fillColor: 'white',
              stroke: true,
              fillOpacity: 1,
              radius: 9,
            },
          ).addTo(mapInstance);

          onItemSelected(feature);
        });
      },
      pointToLayer: (feature: Feature, latlng: L.LatLng) => {
        if (markerRef.current) {
          markerRef.current.remove();
        }

        const marker = L.circleMarker(latlng, {
          color: 'white',
          fillColor: feature?.properties?.color,
          stroke: true,
          fillOpacity: 1,
          radius: 8,
        });

        return marker;
      },
    });
    layer.addTo(mapInstance);

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
          L.circleMarker(new LatLng(sensor.feature.geometry.coordinates[1], sensor.feature.geometry.coordinates[0]), {
            color: 'white',
            fillColor: sensor.feature?.properties?.color,
            stroke: true,
            fillOpacity: 1,
            radius: 8,
          }),
        );
      });
      overlappingSensors.addTo(mapInstance);
    });

    activeLayer.current = layer;
  }, [mapInstance, mapData, onItemSelected]);

  return <></>;
};

export default PointClusterLayer;
