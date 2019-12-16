import React, { useState, useEffect } from 'react';

import 'services/map'; // loads L.Proj (Proj binding leaflet)
import { getDevices, getDevice, getCameraAreas } from 'services/api/iot';
import { useMarkers } from 'services/iotmap';
import PRIVACY_LAYERS_CONFIG from 'services/api/privacyLayersConfig';
import getGeojsonLayers from 'services/api/GeojsonLayers';
import { categories, CAMERA_TOEZICHTSGEBIED } from '../../static/categories';
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
const legend = Object.entries(categories).reduce(
  (acc, [key, category]) => (category.visible && category.enabled ? { ...acc, [key]: category } : { ...acc }),
  {},
);

const Map = () => {
  const mapRef = useMap();
  const [selection, setSelection] = useState(noSelection);
  const [devices, setDevices] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [geojsonLayers, setGeoJsonLayers] = useState([]);

  const clearSelection = () => {
    setSelection(noSelection);
  };

  const addCameraAreas = async () => {
    const results = await getCameraAreas();
    setCameras(results);
  };

  const addDevices = async () => {
    const results = await getDevices();
    setDevices(results);
  };

  const addPrivacy = async () => {
    const results = await getGeojsonLayers(PRIVACY_LAYERS_CONFIG);
    setGeoJsonLayers(results);
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

  const { addMarkers, addAreas, toggleLayer, addPrivacyLayers } = useMarkers(mapRef.current);
  useEffect(() => {
    addAreas(CAMERA_TOEZICHTSGEBIED, cameras, showCameraArea);
  }, [cameras]);

  useEffect(() => {
    addMarkers(devices, showDevice);
  }, [devices]);

  useEffect(() => {
    addPrivacyLayers(geojsonLayers, showCameraArea);
  }, [geojsonLayers]);

  useEffect(() => {
    (async () => {
      await addDevices();
      await addCameraAreas();
      await addPrivacy();
    })();
  }, []);

  return (
    <div className="map-component">
      <div className="map">
        <div id="mapdiv">
          <MapLegend categories={legend} onCategorieToggle={name => toggleLayer(name)} />

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
