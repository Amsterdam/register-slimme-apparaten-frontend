import React from 'react';
import styled from 'styled-components';
import { Accordion, Checkbox, themeSpacing } from '@amsterdam/asc-ui';

const LegendSection = styled('section')`
  margin-bottom: ${themeSpacing(3)};
`;

export interface Props {
  legend: Record<string, string[]> | null;
  selectedItems: string[] | null;
  onToggleCategory: (name: string) => void;
}

const MapLegend: React.FC<Props> = ({ legend, selectedItems, onToggleCategory }) => {
  return (
    <>
      <h2>Legenda</h2>
      {legend &&
        Object.keys(legend).map((categoryName) => (
          <LegendSection key={categoryName}>
            <Accordion id={categoryName} title={categoryName} isOpen>
              {legend[categoryName].map((item) => (
                <div key={item} className="map-legend__row mb-1">
                  <Checkbox checked={selectedItems?.includes(item)} onChange={() => onToggleCategory(item)} />

                  <span className="map-legend__row-title">{item}</span>
                </div>
              ))}
            </Accordion>
          </LegendSection>
        ))}
    </>
  );
};

export default MapLegend;
