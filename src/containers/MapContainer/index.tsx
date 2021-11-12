import React, { useEffect, useMemo, useState } from 'react';
import { MapOptions } from 'leaflet';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { themeSpacing } from '@amsterdam/asc-ui';
import { Map, BaseLayer, Zoom, getCrsRd, ViewerContainer } from '@amsterdam/arm-core';

import useHighlight from './hooks/useHighlight';
import PointClusterLayer from './PointClusterLayer';
import DrawerOverlay, { DeviceMode, DrawerState } from 'components/DrawerOverlay/DrawerOverlay';
import LegendControl from 'components/LegendControl/LegendControl';
import MapLegend from 'components/MapLegend';
import DeviceDetails from 'components/DeviceDetails';
import { ItemType, LegendCategories, OwnerType, PiOptions } from 'utils/types';
import useRetrieveMapDataAndLegend, { emptyFeatureCollection } from './hooks/useRetreiveMapDataAndLegend';
import { Feature } from 'geojson';

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
  width: 370px;
  padding-left: ${themeSpacing(5)};
  padding-right: ${themeSpacing(5)};
`;

enum LegendOrDetails {
  LEGEND,
  DETAILS,
}

const MapContainer: () => JSX.Element = () => {
  const { highlight } = useHighlight();
  const { push } = useHistory();

  const [drawerState, setDrawerState] = useState<DrawerState>(DrawerState.Open);
  const [legendOrDetails, setLegendOrDetails] = useState<LegendOrDetails>(LegendOrDetails.LEGEND);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { legend, featureCollection } = useRetrieveMapDataAndLegend();

  const handleItemSelected = (name: string, feature: ItemType, element: HTMLElement, queryString?: string) => {
    if (queryString) push({ pathname: '/', search: queryString });

    setDrawerState(DrawerState.Open);
    setLegendOrDetails(LegendOrDetails.DETAILS);

    setSelectedItem(feature);

    highlight(element);
  };

  const ownerFilter = (feature: Feature, ownerFilter: string[]) => {
    if (ownerFilter.length === 2) {
      return true;
    }

    if (ownerFilter.length === 0) {
      return false;
    }

    return (
      (ownerFilter[0] === OwnerType.Gemeente && feature.properties?.organisation === OwnerType.Gemeente) ||
      (ownerFilter[0] === OwnerType.Other && feature.properties?.organisation !== OwnerType.Gemeente)
    );
  };

  const piFilter = (feature: Feature, piFilter: string[]) => {
    if (piFilter.length === 2) {
      return true;
    }

    if (piFilter.length === 0) {
      return false;
    }

    return (
      (piFilter[0] === PiOptions.Ja && feature.properties?.containsPiData === true) ||
      (piFilter[0] === PiOptions.Nee && feature.properties?.containsPiData === false)
    );
  };

  useEffect(() => {
    if (!legend) {
      return;
    }

    setSelectedFilters(
      Object.keys(legend)
        .map((k) => legend[k])
        .flat(),
    );
  }, [legend]);

  const filteredMapData = useMemo(() => {
    if (!featureCollection?.features) {
      return featureCollection;
    }

    if (selectedFilters.length === 0 || !legend) {
      return emptyFeatureCollection();
    }

    const filterdFeatureCollection = emptyFeatureCollection();

    filterdFeatureCollection.features = featureCollection?.features.filter((f) => {
      const allowedSensorTypes = legend[LegendCategories['Sensor type']].filter((type) =>
        selectedFilters.includes(type),
      );

      const owner = legend[LegendCategories.Eigenaar].filter((type) => selectedFilters.includes(type));

      const pi = legend[LegendCategories['Verwerkt persoonsgegevens']].filter((type) => selectedFilters.includes(type));

      return allowedSensorTypes.includes(f.properties?.sensorType) && ownerFilter(f, owner) && piFilter(f, pi);
    });

    return filterdFeatureCollection;
  }, [featureCollection, legend, selectedFilters]);

  return (
    <StyledMap options={MAP_OPTIONS}>
      <StyledViewerContainer bottomRight={<Zoom />} />

      <PointClusterLayer mapData={filteredMapData} onItemSelected={handleItemSelected} />

      <DrawerOverlay
        mode={DeviceMode.Desktop}
        onStateChange={setDrawerState}
        state={drawerState}
        Controls={LegendControl}
        onControlClick={() => setLegendOrDetails(LegendOrDetails.LEGEND)}
      >
        <DrawerContentWrapper>
          {legendOrDetails === LegendOrDetails.DETAILS && (
            <DeviceDetails
              device={selectedItem}
              onDeviceDetailsClose={() => {
                setLegendOrDetails(LegendOrDetails.LEGEND);
              }}
            />
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
