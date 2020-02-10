import React from 'react';
import Map from 'components/Map';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import reducer, {
  addLayerDataActionCreator,
  selectLayerItemActionCreator,
  makeSelectLayers,
  makeSelectedItem,
  makeSelectedLayer,
  removeLayerDataActionCreator,
  removeMapLayerActionCreator,
  addMapLayerActionCreator,
} from './MapContainerDucks';

const MapContainer = ({ ...props }) => <Map {...props} />;

const mapStateToProps = createStructuredSelector({
  layers: makeSelectLayers(),
  selectedLayer: makeSelectedLayer(),
  selectedItem: makeSelectedItem(),
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addLayerData: addLayerDataActionCreator,
      removeLayerData: removeLayerDataActionCreator,
      selectLayerItem: selectLayerItemActionCreator,
      addMapLayer: addMapLayerActionCreator,
      removeMapLayer: removeMapLayerActionCreator,
    },
    dispatch,
  );
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'map', reducer });
export default compose(withReducer, withConnect)(MapContainer);
