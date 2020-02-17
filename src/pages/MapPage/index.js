import React, { Fragment } from 'react';
import MapContainer from 'containers/MapContainer';
// import MapLayers from 'components/MapLayers';
import HeaderContainer from 'containers/HeaderContainer';

const MapPage = () => (
  <Fragment>
    <HeaderContainer />
    <MapContainer />
    {/* <MapLayers/> */}
  </Fragment>
);

export default MapPage;
