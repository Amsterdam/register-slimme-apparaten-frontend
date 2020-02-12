import { useEffect } from 'react';
import { CATEGORY_NAMES } from 'shared/configuration/categories';
import { fetchCameraAreas } from 'services/layer-aggregator/layersFetcher';
import { useHistory, useLocation } from 'react-router-dom';
import queryStringParser from 'shared/services/auth/services/query-string-parser/query-string-parser';

const CamerasLayer = ({ map, data: cameras, selectLayerItem, addLayerData, removeLayerData, layerManager }) => {
  const { push } = useHistory();
  const location = useLocation();
  const { addPolygonLayer, removePolygonLayer, selectFeature } = layerManager;

  const showCameraAreaDetail = item => {
    const { id } = item.properties;
    selectLayerItem('cameras', item);
    push({ pathname: '/', search: `?id=${id}&category=${CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED}` });
  };

  useEffect(() => {
    if (map !== null && cameras != null) {
      addPolygonLayer(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, cameras, showCameraAreaDetail);
      const { id, category } = queryStringParser(location.search);
      if (id && category === CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED) {
        selectFeature(id, category, showCameraAreaDetail);
      }
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
