import React from 'react';
import PropTypes from 'prop-types';

import { legend } from 'shared/configuration/categories';
import { Checkbox } from '../../shared/components/checkbox';

import CollapseIcon from '../../images/icon-arrow-down.svg';
import ExpandIcon from '../../images/icon-arrow-up.svg';
import MapLayersIcon from '../../images/icon-map-layers.svg';

import './style.scss';

class MapLegend extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLegendVisible: window.innerWidth > 576 };
  }

  render() {
    const { onToggleCategory } = this.props;
    const checkboxList = Object.entries(legend).map(([id, category]) => (
      <div key={category.name} className="map-legend__row mb-1">
        <Checkbox name="check" checked={category.enabled} onChange={() => onToggleCategory(id)} />
        <span className="map-legend__icon">
          <img className="map-legend__icon" src={category.iconUrl} alt="" />
        </span>
        <span className="map-legend__row-title">{category.name}</span>
      </div>
    ));

    return (
      <section
        id="map-legend"
        aria-label={
          this.state.isLegendVisible
            ? 'Kaartlagen legenda, Kaartlagen verbergen'
            : 'Kaartlagen legenda, Kaartlagen tonen'
        }
        aria-expanded={this.state.isLegendVisible}
        className={`
          map-legend
          map-legend--${this.state.isLegendVisible ? 'expanded' : 'collapsed'}
        `}
      >
        <button
          type="button"
          className="map-legend__header"
          onClick={() => this.setState({ isLegendVisible: !this.state.isLegendVisible })}
          title={this.state.isLegendVisible ? 'Kaartlagen verbergen' : 'Kaartlagen tonen'}
        >
          <MapLayersIcon className="map-legend__header-icon" />
          <h4 className="map-legend__header-title" aria-hidden="true">
            Apparaten
          </h4>
          <CollapseIcon className="map-legend__header-icon map-legend__header-icon--expanded" />
          <ExpandIcon className="map-legend__header-icon map-legend__header-icon--collapsed" />
        </button>
        <div className="map-legend__body">{checkboxList}</div>
      </section>
    );
  }
}

MapLegend.propTypes = {
  onToggleCategory: PropTypes.func,
};

export default MapLegend;
