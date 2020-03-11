import React, { useMemo } from 'react';
import { MapOptions } from 'leaflet'
import { Map, TileLayer } from '@datapunt/react-maps';
import styled from '@datapunt/asc-core';
import { getCrsRd } from '@datapunt/amsterdam-react-maps/lib/utils';
import { ViewerContainer } from '@datapunt/asc-ui';
import { constants } from '@datapunt/amsterdam-react-maps';
import MapLegend from 'components/MapLegend';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { useHistory } from 'react-router-dom';
import DeviceDetails from 'components/DeviceDetails';
import Geocoder, {
  getSuggestions,
  getAddressById,
} from 'components/Geocoder'
import { Zoom } from '@datapunt/amsterdam-react-maps/lib/components';
import { POLYGON_LAYERS_CONFIG, getPolygonOptions } from '../../services/layer-aggregator/layersConfig';
import reducer, {
  selectLayerItemActionCreator,
  toggleMapLayerActionCreator,
  MapState,
} from './MapContainerDucks';
import { CATEGORY_NAMES } from '../../shared/configuration/categories';
import useHighlight from './hooks/useHighlight';
import PointClusterLayer from './PointClusterLayer';
import MapLayer from './MapLayer';

const MAP_OPTIONS: MapOptions = {
  center: [52.3731081, 4.8932945],
  zoom: 10,
  maxZoom: 16,
  minZoom: 8,
  zoomControl: false,
  crs: getCrsRd(),
  maxBounds: [
    [52.25168, 4.64034],
    [52.50536, 5.10737],
  ],
}

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
      width: 32px !important;
      height: 32px !important;
      margin-top: 4px !important;
      margin-left: 4px !important;
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


const MapContainer = () => {
  const selectedLayer = useSelector<{map?: MapState}>(state => state?.map?.selectedLayer);
  const selectedItem = useSelector<{map?: MapState}>(state => state?.map?.selectedItem);
  const dispatch = useDispatch();
  const { highlight } = useHighlight();
  const { push } = useHistory();
  const clearSelection = () => {
    dispatch(selectLayerItemActionCreator());
  };

  const handleToggleCategory = (name: string) => {
    dispatch(toggleMapLayerActionCreator(name));
  };

  const handleItemSelected = (name: string, feature: any, element: HTMLElement, queryString?: string) => {
    if (queryString) push({ pathname: '/', search: queryString });
    dispatch(selectLayerItemActionCreator(name, feature));

    highlight(element);
  };

  const geocoderProps = useMemo(
    () => ({
      getSuggestions,
      getAddressById,
    }),
    [],
  )

  return (
    <StyledMap options={MAP_OPTIONS} >
      <StyledViewerContainer
        topLeft={<Geocoder {...geocoderProps} />}
        bottomRight={<Zoom />}
      />

      <MapLegend onToggleCategory={handleToggleCategory} />
      {selectedLayer && <DeviceDetails device={selectedItem} selectedLayer={selectedLayer} onDeviceDetailsClose={clearSelection} />}

      <PointClusterLayer onItemSelected={handleItemSelected} />

      <MapLayer
        options={getPolygonOptions(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, handleItemSelected)}
        config={POLYGON_LAYERS_CONFIG}
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
};

const withReducer = injectReducer({ key: 'map', reducer });
export default compose(withReducer)(MapContainer);
