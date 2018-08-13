import React from 'react';
import Map from '../../components/Map';

export default function MapContainer() {
  return (
    <div>
      <Map latlng={{ latitude: '52.372829', longitude: '4.900773' }}></Map>
    </div>
  );
}
