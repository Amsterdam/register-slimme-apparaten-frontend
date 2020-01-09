import React from "react"
import Map from 'components/Map';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectDevices, setDevicesActionCreator, selectDeviceActionCreator } from './ducks';

import injectReducer from 'utils/injectReducer';
import reducer from './ducks';

const MapContainer = ({...props}) => {

  return <Map {...props} />
}

MapContainer.propTypes = {
  devices: PropTypes.array,
  setDevices: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  devices: makeSelectDevices(),
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDevices: setDevicesActionCreator,
      selectDevice: selectDeviceActionCreator,
    },
    dispatch
  );
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'map', reducer });
export default compose(withReducer, withConnect)(MapContainer);
