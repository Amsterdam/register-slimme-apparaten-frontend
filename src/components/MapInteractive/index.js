import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';
import { isEqual } from 'lodash';

import { getMarkers, getThing, getLocation, initIoT } from '../../services/api/iot';
import { onMap, showLocations, getMarkerTypes, toggleMarkers } from '../../services/iotmap';
import amaps from '../../static/pointquery.iife';

import MapLegend from '../MapLegend';
import ThingDetails from '../ThingDetails';

import './style.scss';

const DEFAULT_ZOOM_LEVEL = 14;

class Map extends React.Component {
  constructor(props) {
    super(props);

    initIoT();
    this.map = null;
    this.state = { isLegendVisible: true };
    this.closeThing = this.closeThing.bind(this);
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

      amaps.createMap(options).then((result) => {
        this.map = result;
        onMap(this.map, 'about-iot', 'topright');
      });
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
    this.markers = await getMarkers();
    showLocations(this.map, this.markers, this.showThing.bind(this));
  }

  async showThing(marker) {
    if (marker) {
      const thing = await getThing(marker.id);
      const location = await getLocation(marker.location_id);
      this.setState({ thing, location });
    } else {
      this.thing = null;
      this.location = null;
    }
  }

  closeThing() {
    this.setState({ thing: null, location: null });
  }

  render() {
    const AboutButton = (<Route
      render={({ history }) => (
        <button className="about-button" onClick={() => { history.push('/about'); }}>Over iot-register</button>
      )}
    />);

    const markerTypes = Object.keys(getMarkerTypes()).map((key) =>
      getMarkerTypes()[key]
    );

    return (
      <div className="map-component">
        <div className="map">
          <div id="mapdiv">
            <div id="about-iot">
              { AboutButton }
            </div>
            <MapLegend markers={markerTypes} onMarkerToggle={toggleMarkers}></MapLegend>
            <ThingDetails thing={this.state.thing} location={this.state.location} onThingDetailsClose={this.closeThing}></ThingDetails>
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
