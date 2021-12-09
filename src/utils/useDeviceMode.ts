import { useEffect, useState } from 'react';

export enum DeviceMode {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
}

function getDeviceMode(size: number) {
  if (size <= 650) {
    return DeviceMode.Mobile;
  } else {
    return DeviceMode.Desktop;
  }
}

export function useDeviceMode(): DeviceMode {
  const [deviceMode, setDeviceMode] = useState(getDeviceMode(window.innerWidth));

  useEffect(() => {
    const resizeW = () => setDeviceMode(getDeviceMode(window.innerWidth));

    window.addEventListener('resize', resizeW);

    return () => window.removeEventListener('resize', resizeW);
  }, []);

  return deviceMode;
}
