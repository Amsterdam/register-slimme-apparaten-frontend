import React, { useMemo } from 'react';
import { Map, TileLayer } from '@datapunt/react-maps';
import styled from '@datapunt/asc-core';
import { ViewerContainer } from '@datapunt/asc-ui';
import { constants } from '@datapunt/amsterdam-react-maps';
import MapLegend from 'components/MapLegend';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { useHistory } from 'react-router-dom';
import CameraAreaDetails from 'components/CameraAreaDetails';
import DeviceDetails from 'components/DeviceDetails';
import Geocoder, {
  getSuggestions,
  getAddressById,
} from 'components/Geocoder'
import Zoom from './Zoom';
import { POLYGON_LAYERS_CONFIG, getPolygonOptions } from '../../services/layer-aggregator/layersConfig';
import reducer, {
  selectLayerItemActionCreator,
  toggleMapLayerActionCreator,
} from './MapContainerDucks';
import { CATEGORY_NAMES } from '../../shared/configuration/categories';
import useHighlight from './hooks/useHighlight';
import ClusterLayerGroup from './ClusterLayerGroup';
import MapLayer from './MapLayer';

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
  const selectedLayer = useSelector(state => state?.map?.selectedLayer);
  const selectedItem = useSelector(state => state?.map?.selectedItem);
  const dispatch = useDispatch();
  const { highlight } = useHighlight();
  const { push } = useHistory();
  const clearSelection = () => {
    dispatch(selectLayerItemActionCreator());
  };

  const handleToggleCategory = name => {
    dispatch(toggleMapLayerActionCreator(name));
  };

  const handleItemSelected = (name, feature, element, queryString) => {
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
    <StyledMap options={constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS}>
      <StyledViewerContainer
        topLeft={<Geocoder {...geocoderProps} />}
        bottomRight={<Zoom />}
      />

      <MapLegend onToggleCategory={handleToggleCategory} />
      {selectedLayer === 'devices' && <DeviceDetails device={selectedItem} onDeviceDetailsClose={clearSelection} />}
      {selectedLayer === 'cameras' && <CameraAreaDetails onDeviceDetailsClose={clearSelection} />}

      <ClusterLayerGroup onItemSelected={handleItemSelected} />

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
