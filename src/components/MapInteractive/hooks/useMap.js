import { useRef, useEffect } from 'react';
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
    // Create map
    mapRef.current = amaps.createMap(mapOptions);
  }, []);

  return mapRef;
};

export default useMap;
