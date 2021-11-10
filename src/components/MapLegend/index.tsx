import React from 'react';
import { Accordion, Checkbox } from '@amsterdam/asc-ui';

import { legend } from 'shared/configuration/categories';

import './style.scss';

export interface Props {
  onToggleCategory: (name: string) => void;
}

const MapLegend: React.FC<Props> = ({ onToggleCategory }) => {
  return (
    <>
      <h2>Legenda</h2>
      <section id="map-legend">
        <Accordion id="one" title="Sensortype">
          {Object.entries(legend).map(([id, category]) => (
            <div key={category.name} className="map-legend__row mb-1">
              <Checkbox checked={category.enabled} onChange={() => onToggleCategory(id)} />
              <span className="map-legend__icon">
                <img className="map-legend__icon" src={category.iconUrl} alt="" />
              </span>
              <span className="map-legend__row-title">{category.name}</span>
            </div>
          ))}
        </Accordion>
      </section>
    </>
  );
};

export default MapLegend;
