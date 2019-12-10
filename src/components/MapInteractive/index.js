import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import amaps from 'amsterdam-amaps/dist/amaps';

import { getDevices, getDevice, getCameraAreas } from '../../services/api/iot';
import { showAreas, showMarkers, toggleElement } from '../../services/iotmap';
import { categories } from '../../static/categories';
import '../../services/map'; // loads L.Proj (Proj binding leaflet)

import MapLegend from '../MapLegend';
import DeviceDetails from '../DeviceDetails';
import CameraAreaDetails from '../CameraAreaDetails';

import './style.scss';

const visibleCategories = { ...categories };

Object.keys(visibleCategories)
  .filter(
    cat => !(visibleCategories[cat].visible && visibleCategories[cat].enabled)
  )
  .forEach(cat => {
    delete visibleCategories[cat];
  });

const DEFAULT_ZOOM_LEVEL = 14;

const SELECTION_STATE = {
  NOTHING: 0,
  DEVICE: 1,
  AREA: 2,
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.state = {
      selection: {
        type: SELECTION_STATE.NOTHING,
        element: undefined,
      },
    };
    this.clearSelection = this.clearSelection.bind(this);
  }

  componentDidMount() {
    if (!this.map) {
      const options = {
        layer: 'standaard',
        target: 'mapdiv',
        marker: false,
        search: true,
        zoom: DEFAULT_ZOOM_LEVEL,
        onQueryResult: this.props.onQueryResult,
      };

      if (this.props.location.geometrie) {
        options.marker = true;
        options.center = {
          longitude: this.props.location.geometrie.coordinates[1],
          latitude: this.props.location.geometrie.coordinates[0],
        };
      }

      this.map = amaps.createMap(options);
    }
    if (!isEqual(this.props.location, this.props.location)) {
      const input = document.querySelector('#nlmaps-geocoder-control-input');
      if (input && this.props.location.address) {
        const address = this.props.location.address;
        const toevoeging = address.huisnummer_toevoeging
          ? `-${address.huisnummer_toevoeging}`
          : '';
        const display = `${address.openbare_ruimte} ${address.huisnummer}${address.huisletter}${toevoeging}, ${address.postcode} ${address.woonplaats}`;
        input.setAttribute('value', display);
      }
    }

    this.addMarkers();
    this.addCameraAreas();
  }

  async addCameraAreas() {
    const geojson = await getCameraAreas();
    showAreas(this.map, geojson, this.showCameraArea.bind(this));
  }

  async addMarkers() {
    this.devices = await getDevices();
    showMarkers(this.map, this.devices, this.showDevice.bind(this));
  }

  showCameraArea() {
    // eslint-disable-line no-unused-vars
    const area = {};
    this.setState({ selection: { type: SELECTION_STATE.AREA, element: area } });
  }

  async showDevice(d) {
    if (d) {
      const device = await getDevice(d.id);
      this.setState({
        selection: { type: SELECTION_STATE.DEVICE, element: device },
      });
    } else {
      this.setState({ selection: { type: SELECTION_STATE.NOTHING } });
    }
  }

  clearSelection() {
    this.setState({ selection: { type: SELECTION_STATE.NOTHING } });
  }

  render() {
    return (
      <div className="map-component">
        <div className="map">
          <div id="mapdiv">
            <MapLegend
              categories={visibleCategories}
              onCategorieToggle={key => toggleElement(this.map, key)}
            />

            {this.state.selection.type === SELECTION_STATE.DEVICE && (
              <DeviceDetails
                device={this.state.selection.element}
                location={this.state.location}
                onDeviceDetailsClose={this.clearSelection}
              />
            )}

            {this.state.selection.type === SELECTION_STATE.AREA && (
              <CameraAreaDetails onDeviceDetailsClose={this.clearSelection} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Map.defaultProps = {
  location: {},
  onQueryResult: () => {},
};

Map.propTypes = {
  location: PropTypes.object,
  onQueryResult: PropTypes.func,
};

export default Map;
