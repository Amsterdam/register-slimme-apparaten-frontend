import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { isEqual } from 'lodash';

import { getDevices, getDevice, initIoT } from '../../services/api/iot';
import { showMarkers, toggleMarkers } from '../../services/iotmap';
import categories from '../../static/categories';
import amaps from '../../static/amaps.iife';

import MapLegend from '../MapLegend';
import DeviceDetails from '../DeviceDetails';

import './style.scss';

const DEFAULT_ZOOM_LEVEL = 14;

class Map extends React.Component {
  constructor(props) {
    super(props);

    initIoT();
    this.map = null;
    this.state = { isLegendVisible: true };
    this.closeDevice = this.closeDevice.bind(this);
  }

  componentDidMount() {
    if (!this.map) {
      const options = {
        layer: 'standaard',
        target: 'mapdiv',
        marker: false,
        search: true,
        zoom: DEFAULT_ZOOM_LEVEL,
        onQueryResult: this.props.onQueryResult
      };

      if (this.props.location.geometrie) {
        options.marker = true;
        options.center = {
          longitude: this.props.location.geometrie.coordinates[1],
          latitude: this.props.location.geometrie.coordinates[0]
        };
      }

      this.map = amaps.createMap(options);
    }
    if (!isEqual(this.props.location, this.props.location)) {
      const input = document.querySelector('#nlmaps-geocoder-control-input');
      if (input && this.props.location.address) {
        const address = this.props.location.address;
        const toevoeging = address.huisnummer_toevoeging ? `-${address.huisnummer_toevoeging}` : '';
        const display = `${address.openbare_ruimte} ${address.huisnummer}${address.huisletter}${toevoeging}, ${address.postcode} ${address.woonplaats}`;
        input.setAttribute('value', display);
      }
    }

    this.addMarkers();
  }

  async addMarkers() {
    this.devices = await getDevices();
    showMarkers(this.map, this.devices, this.showDevice.bind(this));
  }

  async showDevice(d) {
    if (d) {
      const device = await getDevice(d.id);
      this.setState({ device });
    } else {
      this.device = null;
    }
  }

  closeDevice() {
    this.setState({ device: null });
  }

  render() {
    const AboutButton = (<Route
      render={({ history }) => (
        <button className="about-button" onClick={() => { history.push('/about'); }}>Over dit register</button>
      )}
    />);

    const markerCategories = Object.keys(categories).map((key) =>
      categories[key]
    );

    return (
      <div className="map-component">
        <div className="map">
          <div id="mapdiv">
            <div id="about-iot">
              { AboutButton }
            </div>
            <MapLegend markers={markerCategories} onMarkerToggle={toggleMarkers}></MapLegend>
            <DeviceDetails device={this.state.device} location={this.state.location} onDeviceDetailsClose={this.closeDevice}></DeviceDetails>
          </div>
        </div>
      </div>
    );
  }
}

Map.defaultProps = {
  location: {},
  onQueryResult: () => {}
};

Map.propTypes = {
  location: PropTypes.object,
  onQueryResult: PropTypes.func
};

export default Map;
