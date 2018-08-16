import React from 'react';
import MapInteractive from '../../components/MapInteractive';

import './style.scss';

const MapContainer = () => {
  const value = {};

  const onQueryResult = (d) => {
    const location = {};

    if (d.dichtstbijzijnd_adres) {
      location.address = { ...d.dichtstbijzijnd_adres };
      location.address.huisnummer = `${location.address.huisnummer}`;
      location.address.huisnummer_toevoeging = `${location.address.huisnummer_toevoeging}`;
    }

    if (d.omgevingsinfo) {
      location.buurt_code = d.omgevingsinfo.buurtcode;
      location.stadsdeel = d.omgevingsinfo.stadsdeelcode;
    }

    if (d.query) {
      location.geometrie = {
        type: 'Point',
        coordinates: [
          d.query.latitude,
          d.query.longitude
        ]
      };
    }
  };

  return (
    <div>
      <MapInteractive onQueryResult={onQueryResult} location={value} />
    </div>
  );
};

MapContainer.propTypes = {
};

export default MapContainer;
