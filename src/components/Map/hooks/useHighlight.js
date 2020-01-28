import { useEffect, useState } from 'react';
import 'leaflet.markercluster';

const useHighlight = () => {
  const [activeMarker, setActiveMarker] = useState();

  const highlight = ({ sourceTarget }) => {
    if (activeMarker) {
      activeMarker._icon.classList.remove('highlight');
    }

    setActiveMarker(sourceTarget);
  };

  useEffect(() => {
    if (activeMarker) activeMarker._icon.classList.add('highlight');
  }, [activeMarker]);

  return highlight;
};

export default useHighlight;
