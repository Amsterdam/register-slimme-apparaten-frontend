import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '../../shared/components/checkbox';

import CollapseIcon from '../../images/icon-arrow-down.svg';
import ExpandIcon from '../../images/icon-arrow-up.svg';
import MapLayersIcon from '../../images/icon-map-layers.svg';

import './style.scss';

class MapLegend extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLegendVisible: true };
  }

  render() {
    const markers = this.props.markers.map((marker) => (
      <div key={marker.name} className="map-legend__row mb-1">
        <Checkbox name="check" checked={marker.enabled} onChange={() => this.props.onMarkerToggle(marker.id)}></Checkbox>
        <span className="map-legend__icon">
          <img className="map-legend__icon" src={marker.iconUrl} alt="" />
        </span>
        <span className="map-legend__row-title">
          {marker.name}
        </span>
      </div>
    ));

    return (
      <section
        id="map-legend"
        aria-label={this.state.isLegendVisible ? 'Kaartlagen legenda, Kaartlagen verbergen' : 'Kaartlagen legenda, Kaartlagen tonen'}
        aria-expanded={this.state.isLegendVisible}
        className={`
          map-legend
          map-legend--${this.state.isLegendVisible ? 'expanded' : 'collapsed'}
        `}
      >
        <button
          className="map-legend__header"
          onClick={() => this.setState({ isLegendVisible: !this.state.isLegendVisible })}
          title={this.state.isLegendVisible ? 'Kaartlagen verbergen' : 'Kaartlagen tonen'}
        >
          <MapLayersIcon className="map-legend__header-icon" />
          <h4 className="map-legend__header-title" aria-hidden="true">Apparaten</h4>
          <CollapseIcon className="map-legend__header-icon map-legend__header-icon--expanded" />
          <ExpandIcon className="map-legend__header-icon map-legend__header-icon--collapsed" />
        </button>
        <div className="map-legend__body">
          {markers}
        </div>
      </section>
    );
  }
}

MapLegend.propTypes = {
  markers: PropTypes.array,
  onMarkerToggle: PropTypes.func
};

export default MapLegend;
