import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import L, { Map as MapType, MapOptions, LayerGroup } from 'leaflet';
import { Feature, FeatureCollection, Polygon } from 'geojson';
import { Map, BaseLayer, constants } from '@amsterdam/arm-core';
import { Area, getAllRegions } from '../../services/regions';
import { rdPolygonToWgs84 } from '../../services/geojson';
import { getFCBoundingBox } from './getFCBoundingBox';

const zoom = 6;
const mapOptions: MapOptions = {
  ...constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS,
  dragging: false,
  attributionControl: false,
  zoomControl: false,
  maxZoom: zoom,
  minZoom: zoom,
  zoom,
};

function getGeoJson(area: Area): Feature<Polygon> {
  const geometry = rdPolygonToWgs84(area.geometrie) as Polygon;

  return {
    type: 'Feature',
    properties: {},
    geometry,
  };
}

const StyledMap = styled(Map)`
  width: 100%;
  overflow: hidden;
  height: 175px;
`;

const Heading = styled.h3`
  margin-top: 0px;
`;

function RegionMap({ regions }: { regions: string[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const layers = useRef<LayerGroup | null>(new LayerGroup());
  const [mapInstance, setMapInstance] = useState<MapType | undefined>();

  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    (async () => {
      setIsLoading(true);
      const allRegions = await getAllRegions();

      // Remove previous layers from LayerGroup
      layers.current?.clearLayers();

      regions.forEach((region) => {
        const area = allRegions[region.toLowerCase()];
        if (!area || !area?.geometrie) {
          console.log(`Region ${region} not found`);

          return;
        }

        // Create new layer and add it to the LayerGroup.
        layers.current?.addLayer(
          L.geoJSON(getGeoJson(area), {
            style: {
              color: '#ec0000',
              fillColor: '#ec0000',
              fillOpacity: 0.2,
            },
          }),
        );
      });

      const collection = layers.current?.toGeoJSON() as FeatureCollection<Polygon, any>;

      mapInstance.fitBounds(getFCBoundingBox(collection));

      // Add the LayerGroup to the map.
      layers.current?.addTo(mapInstance);

      setIsLoading(false);
    })();
  }, [regions, mapInstance]);

  if (!regions?.length) {
    return <></>;
  }

  return (
    <>
      <Heading>Locatie</Heading>
      <StyledMap setInstance={setMapInstance} options={mapOptions} fullScreen>
        <BaseLayer />
      </StyledMap>
    </>
  );
}

export default RegionMap;
