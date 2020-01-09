import { useRef, useEffect } from 'react';
import 'leaflet.markercluster';
import amaps from 'amsterdam-amaps/dist/amaps';

const DEFAULT_ZOOM_LEVEL = 14;

const mapOptions = {
  layer: 'standaard',
  target: 'mapdiv',
  marker: false,
  search: true,
  zoom: DEFAULT_ZOOM_LEVEL,
};

const useMap = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = amaps.createMap(mapOptions);

    mapRef.current.eachLayer(l => {
      if (l.options.sa_id === 'standaard') {
        l.options.subdomains = ['t1', 't2', 't3', 't4']; // eslint-disable-line no-param-reassign
        l.setUrl('https://{s}.data.amsterdam.nl/topo_wm/{z}/{x}/{y}.png');
      }
    });
  }, []);

  return mapRef;
};

export default useMap;
