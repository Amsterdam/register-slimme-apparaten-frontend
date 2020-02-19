import React from 'react';
import { Map, TileLayer } from '@datapunt/react-maps';
import styled from '@datapunt/asc-core';
import { ViewerContainer } from '@datapunt/asc-ui';
import { constants } from '@datapunt/amsterdam-react-maps';
import MapLegend from 'components/MapLegend';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import Zoom from './Zoom';
import GeoJSONLayerWithConfig from './GeoJSONLayerWithConfig';
import { POLYGON_LAYERS_CONFIG, getPolygonOptions } from '../../services/layer-aggregator/layersConfig';
import GeoJSONLayerGroup from './GeoJSONLayerGroup';
import CameraAreaDetails from '../CameraAreaDetails';
import DeviceDetails from '../DeviceDetails';
import reducer, {
  selectLayerItemActionCreator,
} from '../../containers/MapContainer/MapContainerDucks';
import { CATEGORY_NAMES } from '../../shared/configuration/categories';

const StyledMap = styled(Map)`
  width: 100%;
  height: calc(100vh - 50px);
`;

const StyledViewerContainer = styled(ViewerContainer)`
  // z-index: 1;
`;

const MapLayers = () => {
  const selectedLayer = useSelector(state => state?.map?.selectedLayer);
  const selectedItem = useSelector(state => state?.map?.selectedItem);
  const dispatch = useDispatch();

  console.log('MapLayers', selectedLayer, selectedItem);

  const clearSelection = () => {
    dispatch(selectLayerItemActionCreator());
  };

  const handleToggleCategory = name => console.log('toggle', name);
  const handleItemSelected = (name, feature) => {
    dispatch(selectLayerItemActionCreator(name, feature));
  };

  return (
    <StyledMap options={constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS}>
      <StyledViewerContainer bottomRight={<Zoom />} />

      <MapLegend onToggleCategory={handleToggleCategory} />
      {selectedLayer === 'devices' && <DeviceDetails device={selectedItem} onDeviceDetailsClose={clearSelection} />}
      {selectedLayer === 'cameras' && <CameraAreaDetails onDeviceDetailsClose={clearSelection} />}

      <GeoJSONLayerGroup onItemSelected={handleItemSelected} />

      <GeoJSONLayerWithConfig
        name="Cameras"
        config={POLYGON_LAYERS_CONFIG}
        options={getPolygonOptions(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, handleItemSelected)}
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
export default compose(withReducer)(MapLayers);
