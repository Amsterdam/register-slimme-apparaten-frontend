import React from 'react';
import { Map, TileLayer  } from '@datapunt/react-maps';
import styled from '@datapunt/asc-core';
import { ViewerContainer } from '@datapunt/asc-ui';
import { constants } from '@datapunt/amsterdam-react-maps';
import MapLegend from 'components/MapLegend';
import Zoom from './Zoom';
import GeoJSONLayerWithConfig from './GeoJSONLayerWithConfig';
import { POLYGON_LAYERS_CONFIG, LAYER_OPTIONS_CONFIG } from '../../services/layer-aggregator/layersConfig';
import GeoJSONLayerGroup from './GeoJSONLayerGroup';
import { CATEGORY_NAMES } from '../../shared/configuration/categories';

const StyledMap = styled(Map)`
  width: 100%;
  height: calc(100vh - 50px);
`;

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 1;
`;

const MapLayers = () => (
  <StyledMap options={constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS}>
    <StyledViewerContainer bottomRight={<Zoom />} />
    <MapLegend onToggleCategory={name => console.log('toggle', name)} />

    <GeoJSONLayerGroup />

    <GeoJSONLayerWithConfig
      name="Cameras"
      config={POLYGON_LAYERS_CONFIG}
      options={LAYER_OPTIONS_CONFIG[CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED].options}
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
