import { useRef } from 'react';
import 'leaflet.markercluster';

export const HIGHLIGHT_CLASS = 'active-element';

const useHighlight = () => {

  const activeElement = useRef<HTMLElement | null>(null);

  const highlight = (marker: HTMLElement) => {
    activeElement.current?.classList.remove(HIGHLIGHT_CLASS);
    activeElement.current = marker;
    activeElement.current.classList.add(HIGHLIGHT_CLASS);
  };


  return { highlight };
};

export default useHighlight;
