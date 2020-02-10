import React from 'react';
import PropTypes from 'prop-types';

import 'services/map'; // loads L.Proj (Proj binding leaflet)
import MapLegend from '../MapLegend';
import DeviceDetails from '../DeviceDetails';
import CameraAreaDetails from '../CameraAreaDetails';

import './style.scss';
import './amaps-style.scss';
import useMap from './hooks/useMap';
import { MapContainerStyle } from './MapStyle';
import useLayerManager from './hooks/useLayerManager';
import DevicesLayer from './components/DevicesLayer';
import CamerasLayer from './components/CamerasLayer';

const Map = ({ layers, selectedLayer, selectedItem, addLayerData, removeLayerData, selectLayerItem }) => {
  const mapRef = useMap();
  const layerManager = useLayerManager(mapRef.current);

  const clearSelection = () => {
    selectLayerItem();
  };

  return (
    <MapContainerStyle className="map-component">
      <div className="map">
        <div id="mapdiv">
          <MapLegend onToggleCategory={name => layerManager.toggleLayer(name)} />
          <DevicesLayer
            map={mapRef.current}
            data={layers.devices}
            addLayerData={addLayerData}
            removeLayerData={removeLayerData}
            selectLayerItem={selectLayerItem}
            layerManager={layerManager}
          />
          <CamerasLayer
            map={mapRef.current}
            data={layers.cameras}
            addLayerData={addLayerData}
            removeLayerData={removeLayerData}
            selectLayerItem={selectLayerItem}
            layerManager={layerManager}
          />
          {selectedLayer === 'devices' && <DeviceDetails device={selectedItem} onDeviceDetailsClose={clearSelection} />}

          {selectedLayer === 'cameras' && <CameraAreaDetails onDeviceDetailsClose={clearSelection} />}
        </div>
      </div>
    </MapContainerStyle>
  );
};

Map.propTypes = {
  layers: PropTypes.shape({
    devices: PropTypes.shape({ features: PropTypes.array }),
    cameras: PropTypes.shape({ features: PropTypes.array }),
  }).isRequired,
  selectedLayer: PropTypes.string,
  selectedItem: PropTypes.shape({}),
  addLayerData: PropTypes.func.isRequired,
  removeLayerData: PropTypes.func.isRequired,
  selectLayerItem: PropTypes.func.isRequired,
};

export default Map;
