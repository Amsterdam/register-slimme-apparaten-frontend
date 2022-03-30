import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import L, { Map as MapType, GeoJSON, MapOptions } from 'leaflet';
import { Feature, Polygon } from 'geojson';
import { Map, BaseLayer, constants } from '@amsterdam/arm-core';
import { Area, getAllRegions } from '../../services/regions';
import { rdPolygonToWgs84 } from '../../services/geojson';

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

function RegionMap({ region }: { region: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const layer = useRef<GeoJSON | null>(null);
  const [mapInstance, setMapInstance] = useState<MapType | undefined>();

  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    (async () => {
      setIsLoading(true);
      const regions = await getAllRegions();

      const area = regions[region.toLowerCase()];
      if (!area || !area?.geometrie) {
        console.log(`Region ${region} not found`);

        return;
      }

      // Remove current layer from mapInstance.
      layer.current?.removeFrom(mapInstance);

      // Create new layer and add it to the map.
      layer.current = L.geoJSON(getGeoJson(area), {
        style: {
          color: '#ec0000',
          fillColor: '#ec0000',
          fillOpacity: 0.2,
        },
      });
      layer.current.addTo(mapInstance);

      mapInstance.fitBounds(layer.current.getBounds());

      setIsLoading(false);
    })();
  }, [region, mapInstance]);

  return (
    <>
      <Heading>Locatie</Heading>
      <StyledMap setInstance={setMapInstance} options={mapOptions} fullScreen>
        <BaseLayer baseLayer={constants.DEFAULT_AMSTERDAM_LAYERS[2].urlTemplate} />
      </StyledMap>
    </>
  );
}

export default RegionMap;
