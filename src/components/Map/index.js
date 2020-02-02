import React, { useEffect } from 'react';
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

const Map = ({ layers, selectedLayer, selectedItem, addLayerData, selectLayerItem }) => {
  const mapRef = useMap();
  const { addPointClusterLayer, addPolygonLayer, toggleLayer } = useLayerManager(mapRef.current);

  const clearSelection = () => {
    selectLayerItem();
  };

  const fetchCameraAreaLayer = async () => {
    const results = await fetchCameraAreas();
    addLayerData('cameras', results);
  };

  const fetchDevicesLayer = async () => {
    const results = await layersReader(LAYERS_CONFIG);
    const items = results.reduce((acc, { layer }) => [...acc, ...layer.features], []);
    addLayerData('devices', { type: 'FeatureCollection', name: 'devices', features: items });
  };

  const showCameraAreaDetail = item => {
    selectLayerItem('cameras', item);
  };

  const showDeviceDetail = device => {
    if (device) {
      selectLayerItem('devices', device);
    } else {
      selectLayerItem();
    }
  };

  useEffect(() => {
    if (layers.cameras != null) {
      addPolygonLayer(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, layers.cameras, showCameraAreaDetail);
    }
  }, [layers.cameras]);

  useEffect(() => {
    if (layers.devices != null) {
      addPointClusterLayer(layers.devices.features, showDeviceDetail);
    }
  }, [layers.devices]);

  useEffect(() => {
    if (mapRef.current === null) return;
    (async () => {
      const { devices, cameras } = layers;
      if (!devices || devices.features.length === 0) {
        await fetchDevicesLayer();
      }

      if (!cameras || cameras.features.length === 0) {
        await fetchCameraAreaLayer();
      }
    })();
  }, [mapRef.current]);

  return (
    <MapContainerStyle className="map-component">
      <div className="map">
        <div id="mapdiv">
          <MapLegend onToggleCategory={name => toggleLayer(name)} />

          {selectedLayer === 'devices' && (
            <DeviceDetails device={selectedItem} onDeviceDetailsClose={clearSelection} />
          )}

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
  selectLayerItem: PropTypes.func.isRequired,
};

export default Map;
