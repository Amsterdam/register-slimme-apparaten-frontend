import { useRef } from 'react';
import 'leaflet.markercluster';

export const HIGHLIGHT_CLASS = 'active-element';

const useHighlight = () => {
  const activeMarker = useRef(null);
  const activePolygon = useRef(null);

  const clearSelection = () => {
    if (activeMarker.current && activeMarker.current._icon) {
      activeMarker.current._icon.classList.remove(HIGHLIGHT_CLASS);
    }

    if (activePolygon.current) {
      const { classList } = activePolygon.current.getElement();
      if (classList && classList.remove) {
        classList.remove(HIGHLIGHT_CLASS);
      }
    }
  };

  const highlightMarker = marker => {
    clearSelection();
    activeMarker.current = marker;
    activeMarker.current._icon.classList.add(HIGHLIGHT_CLASS);
  };

  const highlightPolygon = polygon => {
    clearSelection();
    activePolygon.current = polygon;
    console.log(activePolygon.current);
    const { classList } = activePolygon.current.getElement();
    console.log(classList);
    if (classList && classList.add) {
      classList.add(HIGHLIGHT_CLASS);
    }
  };

  return { highlightMarker, highlightPolygon };
};

export default useHighlight;
