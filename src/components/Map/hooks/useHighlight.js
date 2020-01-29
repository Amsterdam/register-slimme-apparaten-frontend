import { useRef } from 'react';
import 'leaflet.markercluster';

export const HIGHLIGHT_CLASS = 'active-element';

let areaHighlightLayer;

export const removeCurrentHighlight = () => {
  if (areaHighlightLayer) {
    const classList = areaHighlightLayer.getElement().classList;
    if (classList && classList.remove) {
      classList.remove(HIGHLIGHT_CLASS);
    }
  }
};

const useHighlight = () => {
  const activeMarker = useRef(null);
  const activePolygon = useRef(null);

  const clearSelection = () => {
    if (activeMarker.current && activeMarker.current._icon) {
      activeMarker.current._icon.classList.remove('highlight');
    }

    if (activePolygon.current) {
      const classList = activePolygon.current.getElement().classList;
      if (classList && classList.remove) {
        classList.remove(HIGHLIGHT_CLASS);
      }
    }
  };

  const highlightMarker = marker => {
    clearSelection();
    activeMarker.current = marker;
    activeMarker.current._icon.classList.add('highlight');
  };

  const highlightPolygon = polygon => {
    clearSelection();
    activePolygon.current = polygon;
    const classList = activePolygon.current.getElement().classList;
    if (classList && classList.add) {
      classList.add(HIGHLIGHT_CLASS);
    }
  };

  return { highlightMarker, highlightPolygon };
};

export default useHighlight;
