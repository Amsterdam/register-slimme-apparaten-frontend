import React, { useMemo, useRef } from 'react';
import { Feature } from 'geojson';
import L, { DomEvent } from 'leaflet';
import { useMapInstance } from '@amsterdam/react-maps';
import { emptyFeatureCollection } from './hooks/useRetreiveMapDataAndLegend';
import { Sensor } from '../../classes/Sensor';

interface Props {
  mapData: Sensor[] | null;
  onItemSelected: (feature: Feature) => void;
}

const PointClusterLayer: React.FC<Props> = ({ mapData, onItemSelected }) => {
  const mapInstance = useMapInstance();
  const markerRef = useRef<L.CircleMarker>();
  const activeLayer = useRef<L.GeoJSON>();

  useMemo(() => {
    if (!mapInstance || !mapData) return;

    const fc = emptyFeatureCollection();
    fc.features = mapData.map((s) => s.toFeature());

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

    activeLayer.current = layer;
  }, [mapInstance, mapData, onItemSelected]);

  return <></>;
};

export default PointClusterLayer;
