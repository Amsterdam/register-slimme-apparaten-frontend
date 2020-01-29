import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import 'services/map'; // loads L.Proj (Proj binding leaflet)
import { getDevices, getCameraAreas } from 'services/api/iot';
import PRIVACY_LAYERS_CONFIG from 'services/api/privacyLayersConfig';
import getGeojsonLayers from 'services/api/geojsonLayers';
import { categories, CATEGORY_NAMES } from '../../static/categories';
import MapLegend from '../MapLegend';
import DeviceDetails from '../DeviceDetails';
import CameraAreaDetails from '../CameraAreaDetails';

import './style.scss';
import useMap from './hooks/useMap';
import { MapContainerStyle } from './MapStyle';
import useMarkers from './hooks/useMarkers';

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

const Map = ({ devices, setDevices, selectDevice }) => {
  const mapRef = useMap();
  const [selection, setSelection] = useState(noSelection);
  const [cameras, setCameras] = useState([]);
  const { addMarkers, addAreas, toggleLayer } = useMarkers(mapRef.current);

  const clearSelection = () => {
    setSelection(noSelection);
  };

  const addCameraAreas = async () => {
    const results = await getCameraAreas();
    setCameras(results);
  };

  const addDevices = async () => {
    let markers = [];
    const results = await getDevices();
    markers = [...results];
    const geoJsonResults = await getGeojsonLayers(PRIVACY_LAYERS_CONFIG);
    geoJsonResults.forEach(result => {
      markers = [...markers, ...result.layer.features];
    });
    setDevices(markers);
  };

  const showCameraArea = () => {
    const area = {};
    setSelection({ type: SELECTION_STATE.AREA, element: area });
  };

  const showDevice = device => {
    if (device) {
      selectDevice(device);
      setSelection({ type: SELECTION_STATE.DEVICE, element: device });
    } else {
      setSelection(noSelection);
    }
  };

  useEffect(() => {
    addAreas(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, cameras, showCameraArea);
  }, [cameras]);

  // useEffect(() => {
  //   console.log('addMarkers', devices.length);
  //   addMarkers(devices, showDevice);
  // }, [devices]);

  useEffect(() => {
    if (mapRef.current === null) return;
    (async () => {
      if (devices.length === 0) {
        await addDevices();
      }
      addMarkers(devices, showDevice);
      if (cameras.length === 0) await addCameraAreas();
    })();
  }, [devices, mapRef.current]);

  return (
    <MapContainerStyle className="map-component">
      <div className="map">
        <div id="mapdiv">
          <MapLegend categories={legend} onCategorieToggle={name => toggleLayer(name)} />

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
