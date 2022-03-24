import { useState, useEffect, useRef, useCallback } from 'react';

function useSafeState<T>(initialState: T): [T, (data: T) => void] {
  const [state, setState] = useState<T>(initialState);

  let mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const setSafeState = useCallback((data: T) => {
    mounted.current && setState(data);
  }, []);

  return [state, setSafeState];
}

export default useSafeState;
