import React, { Fragment } from 'react';
import MapInteractive from 'components/MapInteractive';
import HeaderContainer from 'containers/HeaderContainer';

const Map = () => (
  <Fragment>
    <HeaderContainer />
    <MapInteractive />
  </Fragment>
);

export default Map;
