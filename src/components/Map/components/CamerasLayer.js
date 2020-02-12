import { useEffect } from 'react';
import { CATEGORY_NAMES } from 'shared/configuration/categories';
import { fetchCameraAreas } from 'services/layer-aggregator/layersFetcher';
import { useHistory, useLocation } from 'react-router-dom';
import queryStringParser from 'shared/services/auth/services/query-string-parser/query-string-parser';
import useHighlight from '../hooks/useHighlight';

const CamerasLayer = ({ map, data: cameras, selectLayerItem, addLayerData, removeLayerData, layerManager }) => {
  const { push } = useHistory();
  const location = useLocation();
  const { addPolygonLayer, removePolygonLayer, selectFeature } = layerManager;
  const { highlightPolygon } = useHighlight();

  const showCameraAreaDetail = item => {
    const { id } = item.properties;
    push({ pathname: '/', search: `?id=${id}&category=${CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED}` });
    selectLayerItem('cameras', item);
  };

  useEffect(() => {
    if (map !== null && cameras != null) {
      addPolygonLayer(CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED, cameras, showCameraAreaDetail, highlightPolygon);
      const { id, category } = queryStringParser(location.search);
      if (id && category === CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED) {
        selectFeature(id, category, showCameraAreaDetail, highlightPolygon);
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
