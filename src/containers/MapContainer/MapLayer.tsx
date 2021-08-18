/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';
import { GeoJsonObject } from 'geojson';
import { GeoJSONOptions } from 'leaflet';
import { useMapInstance, GeoJSON } from '@amsterdam/react-maps';
import { useDispatch, useSelector } from 'react-redux';
import layersReader from 'services/layer-aggregator/layersReader';
import { CATEGORY_NAMES } from 'shared/configuration/categories';
import { addLayerDataActionCreator, removeLayerDataActionCreator, MapState } from './MapContainerDucks';
import { LayerType } from '../../utils/types';

interface MapLayerProps {
  options: GeoJSONOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
}

interface Category {
  category: string;
  name: string;
  layer: LayerType;
}

const MapLayer: React.FC<MapLayerProps> = ({ options, config }) => {
  const mapInstance = useMapInstance();
  const [json, setJson] = useState<GeoJsonObject>();
  const dispatch = useDispatch();
  const layerName = useRef<string | undefined>();

  const legend = useSelector((state: { map: MapState }) => state?.map?.legend);
  const layer = useSelector((state: { map: MapState }) =>
    state?.map?.layers.filter((l) => l.name === layerName.current && state?.map?.legend[l.name]),
  );

  mapInstance.attributionControl.addAttribution('Kaartgegevens CC-BY-4.0 Gemeente Amsterdam');

  useEffect(() => {
    // @ts-ignore
    setJson(layer[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [legend]);

  useEffect(() => {
    if (!mapInstance) {
      return () => ({});
    }

    (async () => {
      const results: Category[] = await layersReader(config);
      // @ts-ignore
      const features = results.reduce((acc, { layer: l }) => [...acc, ...l.features], []);
      const layerData = {
        type: 'FeatureCollection',
        name: CATEGORY_NAMES.CAMERA_TOEZICHTSGEBIED,
        crs: {
          type: 'name',
          properties: {
            name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
          },
        },
        features,
      } as GeoJsonObject;
      setJson(layerData);
      // @ts-ignore
      layerName.current = layerData.name;
      // @ts-ignore
      dispatch(addLayerDataActionCreator([layerData]));
    })();

    return () => {
      layerName.current && dispatch(removeLayerDataActionCreator([layerName.current]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance, dispatch]);

  return json ? <GeoJSON args={[json]} options={options} /> : null;
};

export default MapLayer;
