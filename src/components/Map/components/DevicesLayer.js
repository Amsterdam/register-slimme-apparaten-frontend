import { useEffect } from 'react';
import LAYERS_CONFIG from 'services/layer-aggregator/layersConfig';
import layersReader from 'services/layer-aggregator/layersReader';
import { useHistory } from 'react-router-dom';

const DevicesLayer = ({ map, data: devices, selectLayerItem, addLayerData, removeLayerData, layerManager }) => {
  const { addPointClusterLayer, removeClusterPointLayer } = layerManager;
  const { push } = useHistory();

  const showDeviceDetail = device => {
    if (device) {
      const { id, category } = device;
      push({ pathname: '/', search: `?id=${id}&type=devices&category=${category}` });
      selectLayerItem('devices', device);
    } else {
      push({ pathname: '/', search: '' });
      selectLayerItem();
    }
  };

  useEffect(() => {
    if (map !== null && devices != null) {
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
      removeLayerData('devices');
    };
  }, []);

  return null;
};

export default DevicesLayer;
