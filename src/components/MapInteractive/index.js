import React, { useState, useMemo, useEffect } from 'react';

import { getDevices, getDevice, getCameraAreas } from '../../services/api/iot';
import { showAreas, showMarkers, toggleElement } from '../../services/iotmap';
import { categories } from '../../static/categories';
import '../../services/map'; // loads L.Proj (Proj binding leaflet)

import MapLegend from '../MapLegend';
import DeviceDetails from '../DeviceDetails';
import CameraAreaDetails from '../CameraAreaDetails';

import './style.scss';
import useMap from './hooks/useMap';

const SELECTION_STATE = {
  NOTHING: 0,
  DEVICE: 1,
  AREA: 2,
};

const noSelection = { selection: { type: SELECTION_STATE.NOTHING, element: undefined } };

const Map = () => {
  const mapRef = useMap();
  const legend = useMemo(() => Object.values(categories).filter(cat => cat.visible && cat.enabled));
  const [selection, setSelection] = useState(noSelection);
  const [devices, setDevices] = useState([]);
  const [cameras, setCameras] = useState([]);

  const clearSelection = () => {
    setSelection(noSelection);
  };

  const addCameraAreas = async () => {
    const results = await getCameraAreas();
    setCameras(results);
  };

  const addMarkers = async () => {
    const results = await getDevices();
    setDevices(results);
  };

  const showCameraArea = () => {
    const area = {};
    setSelection({ type: SELECTION_STATE.AREA, element: area });
  };

  const showDevice = async d => {
    if (d) {
      const device = await getDevice(d.id);
      setSelection({ type: SELECTION_STATE.DEVICE, element: device });
    } else {
      setSelection(noSelection);
    }
  };

  useEffect(() => {
    showAreas(mapRef.current, cameras, showCameraArea);
    showMarkers(mapRef.current, devices, showDevice);
  }, [devices, cameras]);

  useEffect(() => {
    (async () => {
      await addMarkers();
      await addCameraAreas();
    })();
  }, []);

  return (
    <div className="map-component">
      <div className="map">
        <div id="mapdiv">
          <MapLegend categories={legend} onCategorieToggle={key => toggleElement(mapRef.current, key)} />

          {selection.type === SELECTION_STATE.DEVICE && (
            <DeviceDetails device={selection.element} onDeviceDetailsClose={clearSelection} />
          )}

          {selection.type === SELECTION_STATE.AREA && <CameraAreaDetails onDeviceDetailsClose={clearSelection} />}
        </div>
      </div>
    </div>
  );
};

export default Map;
