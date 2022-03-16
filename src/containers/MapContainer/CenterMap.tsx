import { useEffect, useState } from 'react';
import { useMapInstance } from '@amsterdam/react-maps';
import useQuery from './hooks/useQuery';
import { getMarkers } from './PointClusterLayer';
import { LatLng } from 'leaflet';

const defaultCenter = [52.3731081, 4.8932945];

const CenterMap = () => {
  const map = useMapInstance();
  const [lastLocation, setLastLocation] = useState([]);
  const query = useQuery();

  useEffect(() => {
    // Read get param sensor
    const centerLocation = query.get('sensor') !== null ? JSON.parse(query.get('sensor') as string) : defaultCenter;

    // If no lastLocation or the new centerLocation is different to the lastLocation update the map view.
    if (
      lastLocation.length === 0 ||
      (lastLocation.length === 2 && lastLocation[0] !== centerLocation[0] && lastLocation[1] !== centerLocation[1])
    ) {
      setLastLocation(centerLocation); // Store new center
      map.panTo(centerLocation); // Pan map to new center

      const latLng = new LatLng(centerLocation[0], centerLocation[1]);
      const marker = getMarkers()[latLng.toString()]; // Find the marker corresponding to this location

      // Trigger a click event on the marker the user found.
      marker?.fire('click');
    }
  }, [lastLocation, map, query]);

  return <></>;
};

export default CenterMap;
