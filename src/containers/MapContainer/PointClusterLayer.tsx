import React, { useEffect, useState, useRef } from 'react';
import { useMapInstance } from '@amsterdam/react-maps';
import { useDispatch, useSelector } from 'react-redux';
import { MarkerClusterGroupOptions } from 'leaflet';
import layersReader from 'services/layer-aggregator/layersReader';
import queryStringParser from '../../shared/services/auth/services/query-string-parser';
import LAYERS_CONFIG, { getPointOptions } from '../../services/layer-aggregator/layersConfig';
import { addLayerDataActionCreator, removeLayerDataActionCreator } from './MapContainerDucks';
import MarkersCluster, { MarkerClusterData } from '../../components/MarkerCluster/MarkersCluster';

const clusterLayerOptions: MarkerClusterGroupOptions = {
  showCoverageOnHover: false,
};

interface PointClusterLayerProps {
  onItemSelected: Function
};

const transform = (results: any) =>
  results.reduce(
    (acc: any, { category, layer }: {category: string, layer: any}) =>
      layer.features.length
        ? {
          ...acc,
          [category]: {
            type: 'FeatureCollection',
            name: category,
            crs: {
              type: 'name',
              properties: {
                name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
              },
            },
            ...acc[category],
            features: [...(acc[category]?.features || []), ...layer.features],
          },
        }
        : acc,
    {},
  );

const PointClusterLayer: React.FC<PointClusterLayerProps> = ({ onItemSelected }) => {
  const [data, setData] = useState<MarkerClusterData>({});
  const dispatch = useDispatch();
  const layerNames = useRef<Array<string>>([]);
  const mapInstance = useMapInstance();

  const legend = useSelector((state:any) => state?.map?.legend);
  const layers = useSelector((state: any) =>
    state?.map?.layers.filter((l:any) => layerNames.current.includes(l.name) && state?.map?.legend[l.name]),
  );

  const hanleMarkerSelected = (map: any, layer: any, onMarkerSelected: Function, isMarker: boolean) => {
    const bounds = isMarker ? [layer.getLatLng(), layer.getLatLng()] : layer.getBounds();
    map.fitBounds(bounds);
    if (isMarker) {
      map.setZoom(16);
    }

    onMarkerSelected(isMarker ? 'devices' : 'cameras', layer.feature, layer.getElement());
  };

  const udpateSelection = () => {
    if(!mapInstance) return
    const { id, source } = queryStringParser(location.search);
    mapInstance.eachLayer((f: any) => {
      const isMarker = !f.getBounds;
      if (!f.feature) return;
      const featureId = String(isMarker ? f.feature.id : f.feature.properties.id);
      if (isMarker) {
        const chlildMarkers = f.__parent.getAllChildMarkers();
        chlildMarkers.forEach(marker => {
          const fId = String(marker.feature.id);

          if (fId === id && source === marker.feature.contact) {
            hanleMarkerSelected(mapInstance, marker, onItemSelected, true);
          }
        });
      }

      if (featureId === id && source === f.feature.contact) {
        hanleMarkerSelected(mapInstance, f, onItemSelected, isMarker);
      }
    });
  };

  useEffect(() => {
    const layerData = layers.reduce((acc: any, layer: any) => ({ ...acc, [layer.name]: layer }), {});
    setData(layerData);
  }, [legend]);

  useEffect(() => {
    if (!mapInstance) return () => {};
    (async () => {
      const results = await layersReader(LAYERS_CONFIG);
      const layerData = transform(results);
      setData(layerData);
      layerNames.current = [...Object.keys(layerData)];
      dispatch(addLayerDataActionCreator([...Object.values(layerData)]));
      udpateSelection();
    })();
    return () => {
      dispatch(removeLayerDataActionCreator([...layerNames.current]));
    };
  }, [mapInstance]);

  return (
    (
      <MarkersCluster
        clusterOptions={clusterLayerOptions}
        data={data}
        pointOptions={getPointOptions}
        onItemSelected={onItemSelected}
      />
    ) || null
  );
};

export default PointClusterLayer;
