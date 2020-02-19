import { useEffect } from 'react';
import LAYERS_CONFIG from 'services/layer-aggregator/layersConfig';
import layersReader from 'services/layer-aggregator/layersReader';
import { useHistory, useLocation } from 'react-router-dom';
import queryStringParser from 'shared/services/auth/services/query-string-parser/query-string-parser';
import { CATEGORY_NAMES } from 'shared/configuration/categories';

const DevicesLayer = ({ map, data: devices, selectLayerItem, addLayerData, removeLayerData, layerManager }) => {
  const { addPointClusterLayer, removeClusterPointLayer,selectFeature } = layerManager;
  const { push } = useHistory();
  const location = useLocation();

  const showDeviceDetail = device => {
    if (device) {
      const { id, category, contact: source } = device;
      selectLayerItem('devices', device);
      push({ pathname: '/', search: `?id=${id}&category=${category}&source=${source}` });
    } else {
      push({ pathname: '/', search: '' });
      selectLayerItem();
    }
  };

  useEffect(() => {
    if (map !== null && devices != null) {
      addPointClusterLayer(devices.features, showDeviceDetail);
      const { id, category, source} = queryStringParser(location.search);
      if (id && category !== CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED) {
        selectFeature(showDeviceDetail, id, category, source)
      }
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
