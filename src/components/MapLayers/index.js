import React from 'react';
import { Map, TileLayer } from '@datapunt/react-maps';
import styled from '@datapunt/asc-core';
import { ViewerContainer } from '@datapunt/asc-ui';
import { constants } from '@datapunt/amsterdam-react-maps';
import { DomEvent } from 'leaflet';
import Zoom from './Zoom';
import GeoJSONLayer from './GeoJSONLayer';
import GeoJSONLayerWithConfig from './GeoJSONLayerWithConfig';
import { POLYGON_LAYERS_CONFIG } from '../../services/layer-aggregator/layersConfig';

const MAP_API_ROOT = 'https://map.data.amsterdam.nl/';

const markerStyle = {
  weight: 2,
  opacity: 1,
  dashArray: '3',
  color: '#ff0000',
  fillColor: '#ff7800',
  radius: 8,
};

const markerStyleActive = {
  weight: 5,
  dashArray: '',
};

const StyledMap = styled(Map)`
  width: 100%;
  height: calc(100vh - 50px);
`;

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`;

const MapLayers = () => (
  <StyledMap options={constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS}>
    <StyledViewerContainer bottomRight={<Zoom />} />

    <GeoJSONLayerWithConfig
      name="Cameras"
      config={POLYGON_LAYERS_CONFIG}
      options={{
        style: markerStyle,
        onEachFeature: (feature, layer) => {
          layer.bindPopup(`<p>${JSON.stringify(feature.properties)}</p>`);
          layer.on('click', e => {
            DomEvent.stopPropagation(e);
            layer.openPopup();
            if (markerStyleActive) {
              e.target.setStyle(markerStyleActive);
            }
          });
        },
      }}
    />

    <GeoJSONLayer
      url={`${MAP_API_ROOT}maps/parkeervakken?REQUEST=Getfeature&VERSION=1.1.0&SERVICE=wfs&TYPENAME=alle_parkeervakken&srsName=EPSG:4326&Filter=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Ee_type%3C/PropertyName%3E%3CLiteral%3EE6a%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&count=10000&startindex=0&outputformat=geojson`}
      options={{
        style: markerStyle,
        onEachFeature: (feature, layer) => {
          layer.bindPopup(
            `<p>Stadsdeel: ${feature.properties.stadsdeel}</p><p>Straatnaam: ${feature.properties.straatnaam}</p>`,
          );
          layer.on('click', e => {
            DomEvent.stopPropagation(e);
            layer.openPopup();
            if (markerStyleActive) {
              e.target.setStyle(markerStyleActive);
            }
          });
        },
      }}
    />

    <TileLayer
      args={[constants.DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate]}
      options={{
        subdomains: ['1', '2', '3', '4'],
        tms: true,
        attribution: 'Kaartgegevens CC-BY-4.0 Gemeente Amsterdam',
      }}
    />
  </StyledMap>
);

export default MapLayers;
