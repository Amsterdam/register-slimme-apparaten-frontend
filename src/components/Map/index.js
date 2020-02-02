import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import 'services/map'; // loads L.Proj (Proj binding leaflet)
import { CATEGORY_NAMES } from 'shared/configuration/categories';
import { fetchCameraAreas } from 'services/layer-aggregator/layersFetcher';
import LAYERS_CONFIG from 'services/layer-aggregator/layersConfig';
import layersReader from 'services/layer-aggregator/layersReader';
import MapLegend from '../MapLegend';
import DeviceDetails from '../DeviceDetails';
import CameraAreaDetails from '../CameraAreaDetails';

import './style.scss';
import './amaps-style.scss';
import useMap from './hooks/useMap';
import { MapContainerStyle } from './MapStyle';
import useLayerManager from './hooks/useLayerManager';

const SELECTION_STATE = {
  NOTHING: 0,
  DEVICE: 1,
  AREA: 2,
};

const noSelection = { selection: { type: SELECTION_STATE.NOTHING, element: undefined } };

const Map = ({ devices, setDevices, selectDevice }) => {
  const mapRef = useMap();
  const [selection, setSelection] = useState(noSelection);
  const [cameras, setCameras] = useState([]);
  const { addPointClusterLayer, addPolygonLayer, toggleLayer } = useLayerManager(mapRef.current);

  const clearSelection = () => {
    setSelection(noSelection);
  };

  const fetchCameraAreaLayer = async () => {
    const results = await fetchCameraAreas();
    setCameras(results);
  };

  const fetchDevicesLayer = async () => {
    const results = await layersReader(LAYERS_CONFIG);
    const markers = results.reduce((acc, {layer}) => [...acc, ...layer.features],[]);
    setDevices(markers);
  };

  const showCameraAreaDetail = () => {
    const area = {};
    setSelection({ type: SELECTION_STATE.AREA, element: area });
  };

  const showDeviceDetail = device => {
    if (device) {
      selectDevice(device);
      setSelection({ type: SELECTION_STATE.DEVICE, element: device });
    } else {
      setSelection(noSelection);
    }
  };

  useEffect(() => {
    addPolygonLayer(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, cameras, showCameraAreaDetail);
  }, [cameras]);

  useEffect(() => {
    if (mapRef.current === null) return;
    (async () => {
      if (devices.length === 0) {
        await fetchDevicesLayer();
      }
      addPointClusterLayer(devices, showDeviceDetail);

      if (cameras.length === 0) await fetchCameraAreaLayer();
    })();
  }, [devices, mapRef.current]);

  return (
    <MapContainerStyle className="map-component">
      <div className="map">
        <div id="mapdiv">
          <MapLegend onToggleCategory={name => toggleLayer(name)} />

          {selection.type === SELECTION_STATE.DEVICE && (
            <DeviceDetails device={selection.element} onDeviceDetailsClose={clearSelection} />
          )}

          {selection.type === SELECTION_STATE.AREA && <CameraAreaDetails onDeviceDetailsClose={clearSelection} />}
        </div>
      </div>
    </MapContainerStyle>
  );
};

Map.propTypes = {
  devices: PropTypes.array.isRequired,
  setDevices: PropTypes.func.isRequired,
  selectDevice: PropTypes.func.isRequired,
};

export default Map;
