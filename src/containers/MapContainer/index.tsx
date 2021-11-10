import React, { useState } from 'react';
import { MapOptions } from 'leaflet';
import styled from 'styled-components';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { themeSpacing } from '@amsterdam/asc-ui';
import { Map, BaseLayer, Zoom, getCrsRd, ViewerContainer } from '@amsterdam/arm-core';

import injectReducer from 'utils/injectReducer';
import CameraAreaDetails from 'components/CameraAreaDetails';
import { POLYGON_LAYERS_CONFIG, getPolygonOptions } from '../../services/layer-aggregator/layersConfig';
import reducer, { selectLayerItemActionCreator, toggleMapLayerActionCreator, MapState } from './MapContainerDucks';
import { CATEGORY_NAMES } from '../../shared/configuration/categories';
import useHighlight from './hooks/useHighlight';
import PointClusterLayer from './PointClusterLayer';
import MapLayer from './MapLayer';
import DrawerOverlay, { DeviceMode, DrawerState } from 'components/DrawerOverlay/DrawerOverlay';
import LegendControl from 'components/LegendControl/LegendControl';
import MapLegend from 'components/MapLegend';

const MAP_OPTIONS: MapOptions = {
  center: [52.3731081, 4.8932945],
  zoom: 10,
  maxZoom: 16,
  minZoom: 8,
  zoomControl: false,
  attributionControl: true,
  crs: getCrsRd(),
  maxBounds: [
    [52.25168, 4.64034],
    [52.50536, 5.10737],
  ],
};

const StyledMap = styled(Map)`
  width: 100%;
  height: calc(100vh - 50px);

  .leaflet-marker-icon.active-element {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.8);
    border-radius: 50%;
  }

  .leaflet-interactive.active-element {
    stroke-width: 3;
  }

  // Override cluster design from leaflet
  .marker-cluster {
    color: white;
    background-color: white !important;
    box-shadow: 1px 1px 1px #666666;

    div {
      width: ${themeSpacing(8)} !important;
      height: ${themeSpacing(8)} !important;
      margin-top: ${themeSpacing(1)} !important;
      margin-left: ${themeSpacing(1)} !important;
      background-color: #004699 !important;
    }

    span {
      line-height: 34px !important;
    }
  }
`;

const StyledViewerContainer = styled(ViewerContainer)`
  top: 50px;
  z-index: 400;
`;

const DrawerContentWrapper = styled('div')`
  width: 350px;
  padding-left: ${themeSpacing(5)};
  padding-right: ${themeSpacing(5)};
`;

const MapContainer = () => {
  const selectedLayer = useSelector<{ map?: MapState }>((state) => state?.map?.selectedLayer);
  const selectedItem = useSelector<{ map?: MapState }>((state) => state?.map?.selectedItem);
  const dispatch = useDispatch();
  const { highlight } = useHighlight();
  const { push } = useHistory();
  const clearSelection = () => {
    dispatch(selectLayerItemActionCreator());
  };
  const [drawerState, setDrawerState] = useState<DrawerState>(DrawerState.Open);

  const handleToggleCategory = (name: string) => {
    dispatch(toggleMapLayerActionCreator(name));
  };

  const handleItemSelected = (name: string, feature: any, element: HTMLElement, queryString?: string) => {
    if (queryString) push({ pathname: '/', search: queryString });
    dispatch(selectLayerItemActionCreator(name, feature));
    highlight(element);
  };

  return (
    <StyledMap options={MAP_OPTIONS}>
      <StyledViewerContainer bottomRight={<Zoom />} />

      {/* <MapLegend onToggleCategory={handleToggleCategory} /> */}
      {/* {selectedLayer === 'devices' && <DeviceDetails device={selectedItem} onDeviceDetailsClose={clearSelection} />} */}
      {selectedLayer === 'cameras' && <CameraAreaDetails device={selectedItem} onDeviceDetailsClose={clearSelection} />}

      <PointClusterLayer onItemSelected={handleItemSelected} />

      <MapLayer
        options={getPolygonOptions(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, handleItemSelected)}
        config={POLYGON_LAYERS_CONFIG}
      />

      <DrawerOverlay
        mode={DeviceMode.Desktop}
        onStateChange={setDrawerState}
        state={drawerState}
        Controls={LegendControl}
      >
        <DrawerContentWrapper>
          {selectedLayer === 'devices' && <h2>Device</h2>}

          {selectedLayer === 'legend' && <MapLegend onToggleCategory={handleToggleCategory} />}
        </DrawerContentWrapper>
      </DrawerOverlay>

      <BaseLayer />
    </StyledMap>
  );
};

const withReducer = injectReducer({ key: 'map', reducer });
export default compose(withReducer)(MapContainer);
