import React, { useEffect, useRef, useState } from 'react';
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

  const [activeLayer, setActiveLayer] = useState<L.GeoJSON>();

  useEffect(() => {
    if (!mapInstance || !mapData) return;

    console.time('create layer');
    activeLayer?.remove();

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
    console.timeEnd('create layer');

    setActiveLayer(layer);
  }, [mapInstance, mapData]);

  return (
    <>
      {/* {mapData && legend && selectedFilters && (
        <GeoJSON
          args={[mapData]}
          options={{
            ...getPointOptions('', onItemSelected),
            filter: (feature) => {
              console.log('filter');
              if (selectedFilters.length === 0) {
                return false;
              }

              const allowedSensorTypes = legend[LegendCategories['Sensor type']].filter((type) =>
                selectedFilters.includes(type),
              );

              const owner = legend[LegendCategories.Eigenaar].filter((type) => selectedFilters.includes(type));

              console.log(allowedSensorTypes.includes(feature.properties?.sensorType) && ownerFilter(feature, owner));

              return allowedSensorTypes.includes(feature.properties?.sensorType) && ownerFilter(feature, owner);
            },
          }}
        />
      )} */}
    </>
  );
};

export default PointClusterLayer;
