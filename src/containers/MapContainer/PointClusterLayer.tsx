import React, { useEffect, useMemo, useRef } from 'react';
import { useMapInstance } from '@amsterdam/react-maps';
import { Feature, FeatureCollection } from 'geojson';
import L, { DomEvent } from 'leaflet';

interface Props {
  mapData: FeatureCollection | null;
  onItemSelected: (feature: Feature) => void;
}

const PointClusterLayer: React.FC<Props> = ({ mapData, onItemSelected }) => {
  const mapInstance = useMapInstance();
  const markerRef = useRef<L.CircleMarker>();
  const activeLayer = useRef<L.GeoJSON>();

  console.log('PointClusterLayer render');

  useMemo(() => {
    if (!mapInstance || !mapData) return;

    console.log('useMemo PointCluserLayer');

    activeLayer.current?.remove();

    const layer = L.geoJSON(mapData, {
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
