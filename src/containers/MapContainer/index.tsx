import React, { useCallback, useEffect, useState } from 'react';
import { MapOptions } from 'leaflet';
import styled from 'styled-components';
import { Feature } from 'geojson';

import { breakpoint, themeSpacing } from '@amsterdam/asc-ui';
import { Map, BaseLayer, Zoom, getCrsRd, ViewerContainer } from '@amsterdam/arm-core';

import PointClusterLayer from './PointClusterLayer';
import DrawerOverlay, { DrawerState } from '../../components/DrawerOverlay/DrawerOverlay';
import LegendControl from '../../components/LegendControl/LegendControl';
import MapLegend from '../../components/MapLegend';
import DeviceDetails from '../../components/DeviceDetails';
import useRetrieveMapDataAndLegend, { emptyFeatureCollection } from './hooks/useRetreiveMapDataAndLegend';
import useFilter from './hooks/useFilter';

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
  height: calc(100vh - 54px);

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
  width: 100%;

  @media screen and (${breakpoint('min-width', 'tabletM')}) {
    width: 100%;
  }

  padding-left: ${themeSpacing(5)};
  padding-right: ${themeSpacing(5)};
  overflow-y: auto;
`;

enum LegendOrDetails {
  LEGEND,
  DETAILS,
}

const MapContainer: () => JSX.Element = () => {
  const [drawerState, setDrawerState] = useState<DrawerState>(DrawerState.Open);
  const [legendOrDetails, setLegendOrDetails] = useState<LegendOrDetails>(LegendOrDetails.LEGEND);
  const [selectedItem, setSelectedItem] = useState<Feature | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { legend, sensors } = useRetrieveMapDataAndLegend();

  const handleItemSelected = useCallback(
    (feature: Feature) => {
      setDrawerState(DrawerState.Open);
      setLegendOrDetails(LegendOrDetails.DETAILS);

      setSelectedItem(feature);
    },
    [setDrawerState, setSelectedItem, setLegendOrDetails],
  );

  const showLegend = useCallback(() => setLegendOrDetails(LegendOrDetails.LEGEND), [setLegendOrDetails]);

  const filteredMapData = useFilter(sensors || [], legend || {}, selectedFilters);

  return (
    <StyledMap options={MAP_OPTIONS}>
      <StyledViewerContainer bottomRight={<Zoom />} />

      <PointClusterLayer mapData={filteredMapData} onItemSelected={handleItemSelected} />

      <DrawerOverlay
        onStateChange={setDrawerState}
        state={drawerState}
        Controls={LegendControl}
        onControlClick={() => setLegendOrDetails(LegendOrDetails.LEGEND)}
      >
        <DrawerContentWrapper>
          {legendOrDetails === LegendOrDetails.DETAILS && (
            <DeviceDetails feature={selectedItem} showLegend={showLegend} />
          )}

          {legendOrDetails === LegendOrDetails.LEGEND && (
            <MapLegend
              legend={legend}
              selectedItems={selectedFilters}
              onToggleCategory={(category) => {
                if (selectedFilters.includes(category)) {
                  return setSelectedFilters(selectedFilters.filter((l) => l !== category));
                }

                setSelectedFilters([...selectedFilters, category]);
              }}
            />
          )}
        </DrawerContentWrapper>
      </DrawerOverlay>
      <BaseLayer />
    </StyledMap>
  );
};

export default MapContainer;
