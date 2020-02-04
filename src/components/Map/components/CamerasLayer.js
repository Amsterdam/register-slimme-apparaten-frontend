import { useEffect } from 'react';
import { CATEGORY_NAMES } from 'shared/configuration/categories';
import { fetchCameraAreas } from 'services/layer-aggregator/layersFetcher';

const CamerasLayer = ({ map, data: cameras, selectLayerItem, addLayerData, removeLayerData, layerManager }) => {
  const { addPolygonLayer, removePolygonLayer } = layerManager;

  const showCameraAreaDetail = item => {
    selectLayerItem('cameras', item);
  };

  useEffect(() => {
    if (map !== null && cameras != null) {
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
      removeLayerData('cameras');
    };
  }, []);

  return null;
};

export default CamerasLayer;
