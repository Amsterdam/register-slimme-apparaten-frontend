import React, { useState, useEffect } from 'react';
import { createLeafletComponent, GeoJSON } from '@amsterdam/react-maps';
import L, { GeoJSONOptions, MarkerClusterGroupOptions } from 'leaflet';
import { FeatureCollection } from 'geojson';

const MarkerClusterGroup = createLeafletComponent('markerClusterGroup');

export interface MarkerClusterData {
  [name: string]: FeatureCollection;
}

interface Props {
  clusterOptions: MarkerClusterGroupOptions;
  pointOptions: (name: string, onItemSelected: () => void) => GeoJSONOptions;
  data: MarkerClusterData;
  onItemSelected: (name: string, feature: any, element: HTMLElement, queryString?: string | undefined) => void;
}

const MarkersCluster: React.FC<Props> = ({ clusterOptions, data, pointOptions, onItemSelected }) => {
  // const [layerInstance, setLayerInstance] = useState<GeoJSON>();

  // useEffect(() => {
  //   if (layerInstance) {
  //     layerInstance.clearLayers();
  //     Object.entries(data)?.forEach(([name, value]) => {
  //       const layer = L.geoJSON(value, pointOptions(name, onItemSelected));
  //       layerInstance.addLayer(layer);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [layerInstance, data, onItemSelected]);

  // @ts-ignore
  // return <MarkerClusterGroup setInstance={setLayerInstance} options={clusterOptions} /> || null;
  return Object.entries(data)?.map(([name, value]) => {
    // const layer = L.geoJSON(value, pointOptions(name, onItemSelected));
    // layerInstance.addLayer(layer);
    return <GeoJSON key={name} args={[value]} options={pointOptions(name, onItemSelected)} />;
  });
};

export default MarkersCluster;
