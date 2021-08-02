import React, { useState, useEffect } from 'react';
import { createLeafletComponent } from '@amsterdam/react-maps';
import L, { GeoJSONOptions, MarkerClusterGroupOptions } from 'leaflet';
import { FeatureCollection } from 'geojson';

const MarkerClusterGroup = createLeafletComponent('markerClusterGroup');

export interface MarkerClusterData {
  [name: string]: FeatureCollection;
}

interface MarkersClusterProps {
  clusterOptions: MarkerClusterGroupOptions;
  pointOptions: (name: string, onItemSelected: () => void) => GeoJSONOptions;
  data: MarkerClusterData;
  onItemSelected: () => void;
}

const MarkersCluster: React.FC<MarkersClusterProps> = ({ clusterOptions, data, pointOptions, onItemSelected }) => {
  const [layerInstance, setLayerInstance] = useState<any>();

  useEffect(() => {
    if (layerInstance) {
      layerInstance.clearLayers();
      Object.entries(data)?.forEach(([name, value]) => {
        const layer = L.geoJSON(value, pointOptions(name, onItemSelected));
        layerInstance.addLayer(layer);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerInstance, data, onItemSelected]);

  return <MarkerClusterGroup setInstance={setLayerInstance} options={clusterOptions} /> || null;
};

export default MarkersCluster;
