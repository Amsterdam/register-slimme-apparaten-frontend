import React, { useEffect, useState, useRef } from 'react';
import { useMapInstance, GeoJSON } from '@amsterdam/react-maps';
import { Feature, FeatureCollection } from 'geojson';
import L from 'leaflet';

import queryStringParser from '../../shared/services/auth/services/query-string-parser';
import { getPointOptions } from '../../services/layer-aggregator/layersConfig';
import { LegendCategories, OwnerType } from 'utils/types';

interface Props {
  mapData: FeatureCollection | null;
  onItemSelected: (name: string, feature: any, element: HTMLElement, queryString?: string) => void;
}

const PointClusterLayer: React.FC<Props> = ({ mapData, onItemSelected }) => {
  const mapInstance = useMapInstance();

  const handleMarkerSelected = (
    map: any,
    layer: any,
    onMarkerSelected: (name: string, feature: any, element: HTMLElement, queryString?: string) => void,
    isMarker: boolean,
  ) => {
    const bounds = isMarker ? [layer.getLatLng(), layer.getLatLng()] : layer.getBounds();
    map.fitBounds(bounds);
    if (isMarker) {
      map.setZoom(16);
    }

    onMarkerSelected(isMarker ? 'devices' : 'cameras', layer.feature, layer.getElement());
  };

  const updateSelection = () => {
    if (!mapInstance) return;
    const { id, source } = queryStringParser(location.search);
    mapInstance.eachLayer((f: any) => {
      const isMarker = !f.getBounds;
      if (!f.feature) return;
      const featureId = String(isMarker ? f.feature.id : f.feature.properties.id);
      if (isMarker) {
        const childMarkers = f.__parent.getAllChildMarkers();
        childMarkers.forEach((marker) => {
          const fId = String(marker.feature.id);

          if (fId === id && source === marker.feature.contact) {
            handleMarkerSelected(mapInstance, marker, onItemSelected, true);
          }
        });
      }

      if (featureId === id && source === f.feature.contact) {
        handleMarkerSelected(mapInstance, f, onItemSelected, isMarker);
      }
    });
  };

  // useEffect(() => {
  //   const layerData = layers.reduce((acc: any, layer: any) => ({ ...acc, [layer.name]: layer }), {});
  //   setData(layerData);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [legend]);

  // useEffect(() => {
  //   if (!mapInstance) return () => ({});
  //   (async () => {
  //     const results = await layersReader(LAYERS_CONFIG);
  //     console.log(results);
  //     const layerData = transform(results);
  //     console.log(layerData);
  //     setData(layerData);
  //     layerNames.current = [...Object.keys(layerData)];
  //     // dispatch(addLayerDataActionCreator([...Object.values<LayerType>(layerData)]));
  //     updateSelection();
  //   })();
  //   return () => {
  //     // dispatch(removeLayerDataActionCreator([...layerNames.current]));
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [mapInstance]);

  console.log(mapData?.features?.length);

  const [activeLayer, setActiveLayer] = useState<L.GeoJSON>();

  useEffect(() => {
    if (!mapInstance || !mapData) return;

    console.time('create layer');
    activeLayer?.remove();

    const layer = L.geoJSON(mapData, getPointOptions('', onItemSelected));
    layer.addTo(mapInstance);
    console.timeEnd('create layer');

    setActiveLayer(layer);
  }, [mapInstance, mapData]);

  return (
    <>
      {/* {mapData && legend && selectedFilters && (
        <GeoJSON
          args={[mapData]}
          options={{
            ...getPointOptions('', onItemSelected),
            filter: (feature) => {
              console.log('filter');
              if (selectedFilters.length === 0) {
                return false;
              }

              const allowedSensorTypes = legend[LegendCategories['Sensor type']].filter((type) =>
                selectedFilters.includes(type),
              );

              const owner = legend[LegendCategories.Eigenaar].filter((type) => selectedFilters.includes(type));

              console.log(allowedSensorTypes.includes(feature.properties?.sensorType) && ownerFilter(feature, owner));

              return allowedSensorTypes.includes(feature.properties?.sensorType) && ownerFilter(feature, owner);
            },
          }}
        />
      )} */}
    </>
  );
};

export default PointClusterLayer;
