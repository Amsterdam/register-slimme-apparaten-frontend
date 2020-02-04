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

const CamerasLayer = ({ map, data: cameras, selectLayerItem, addLayerData, removeLayerData, layerManager }) => {
  const { addPolygonLayer, removePolygonLayer } = layerManager;

  const showCameraAreaDetail = item => {
    selectLayerItem('cameras', item);
  };

  useEffect(() => {
    if (map!== null && cameras != null) {
      addPolygonLayer(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, cameras, showCameraAreaDetail);
    }
    return () => removePolygonLayer();
  }, [map, cameras]);

  useEffect(() => {
    (async () => {
      const features = await fetchCameraAreas();

      addLayerData('cameras', features);
    })();

    return () => {
      removeLayerData('cameras')
    };

  }, []);

  return null;
};

const ClusterLayer = ({ map, data: devices, selectLayerItem, addLayerData, removeLayerData,layerManager }) => {
  const { addPointClusterLayer, removeClusterPointLayer } = layerManager;

  const showDeviceDetail = device => {
    if (device) {
      selectLayerItem('devices', device);
    } else {
      selectLayerItem();
    }
  };

  useEffect(() => {
    if (map!== null && devices != null) {
      addPointClusterLayer(devices.features, showDeviceDetail);
    }
    return () => removeClusterPointLayer();
  }, [map, devices]);

  useEffect(() => {
    (async () => {
      const results = await layersReader(LAYERS_CONFIG);
      const features = results.reduce((acc, { layer }) => [...acc, ...layer.features], []);

      addLayerData('devices', { type: 'FeatureCollection', name: 'devices', features });
    })();
    return () => {
      removeLayerData('devices')
    };
  }, []);

  return null;
};

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
          <ClusterLayer map={mapRef.current} data={layers.devices} addLayerData={addLayerData} removeLayerData={removeLayerData} selectLayerItem={selectLayerItem} layerManager={layerManager}/>
          <CamerasLayer map={mapRef.current} data={layers.cameras} addLayerData={addLayerData} removeLayerData={removeLayerData} selectLayerItem={selectLayerItem} layerManager={layerManager}/>
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
