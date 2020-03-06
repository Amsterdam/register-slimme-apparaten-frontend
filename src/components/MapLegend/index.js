import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { legend } from 'shared/configuration/categories';
import { Checkbox } from '../../shared/components/checkbox';

import CollapseIcon from '../../images/icon-arrow-down.svg';
import ExpandIcon from '../../images/icon-arrow-up.svg';
import MapLayersIcon from '../../images/icon-map-layers.svg';

import './style.scss';

const MapLegend = ({ onToggleCategory }) => {
  const [isLegendVisible, setLegendVisible] = useState(window.innerWidth > 576);

  return (
    <section
      id="map-legend"
      aria-label={
        isLegendVisible
          ? 'Kaartlagen legenda, Kaartlagen verbergen'
          : 'Kaartlagen legenda, Kaartlagen tonen'
      }
      aria-expanded={isLegendVisible}
      className={`
          map-legend
          map-legend--${setLegendVisible ? 'expanded' : 'collapsed'}
        `}
    >
      <button
        type="button"
        className="map-legend__header"
        onClick={() => setLegendVisible(!isLegendVisible)}
        title={isLegendVisible ? 'Kaartlagen verbergen' : 'Kaartlagen tonen'}
      >
        <MapLayersIcon className="map-legend__header-icon" />
        <h4 className="map-legend__header-title">
          Apparaten
        </h4>
        <CollapseIcon className="map-legend__header-icon map-legend__header-icon--expanded" />
        <ExpandIcon className="map-legend__header-icon map-legend__header-icon--collapsed" />
      </button>
      <div className="map-legend__body">
        {Object.entries(legend).map(([id, category]) => (
          <div key={category.name} className="map-legend__row mb-1">
            <Checkbox name="check" checked={category.enabled} onChange={() => onToggleCategory(id)} />
            <span className="map-legend__icon">
              <img className="map-legend__icon" src={category.iconUrl} alt="" />
            </span>
            <span className="map-legend__row-title">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

MapLegend.propTypes = {
  onToggleCategory: PropTypes.func,
};

export default MapLegend;
