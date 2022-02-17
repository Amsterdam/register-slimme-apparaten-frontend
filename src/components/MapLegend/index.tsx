import React from 'react';
import styled from 'styled-components';
import { Accordion, Checkbox, themeSpacing } from '@amsterdam/asc-ui';
import { LegendCategories, mapSensorTypeToColor } from '../../utils/types';
import { SensorFilter } from '../../classes/SensorFilter';

const LegendSection = styled('section')`
  margin-bottom: ${themeSpacing(3)};
`;

export interface Props {
  legend: Record<string, string[]> | null;
  selectedItems: string[] | null;
  onToggleCategory: (name: string) => void;
  filter: SensorFilter;
}

const Circle = ({ color }: { color: string }) => {
  return (
    <svg
      viewBox="0 0 10 10"
      width="15px"
      height="15px"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: '4px' }}
    >
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  );
};

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const LegendText = styled.span`
  display: flex;
  align-items: center;
`;

const mapLegendToProperties = {
  [LegendCategories.Thema]: 'themeCount',
  [LegendCategories['Verwerkt persoonsgegevens']]: 'piCount',
  [LegendCategories.Eigenaar]: 'ownerCount',
};

const MapLegend: React.FC<Props> = ({ legend, selectedItems, onToggleCategory, filter }) => {
  const otherCategories =
    (legend && Object.keys(legend).filter((category) => category !== LegendCategories['Sensor type'])) || [];

  return (
    <>
      <h2>Legenda</h2>
      {/* Because of the color legend we map sensor types seperatly */}
      {legend && (
        <LegendSection>
          <Accordion id={LegendCategories['Sensor type']} title={LegendCategories['Sensor type']} isOpen>
            {legend[LegendCategories['Sensor type']].map((item: string) => {
              const selected = selectedItems?.includes(item);

              return (
                <LegendItem key={item}>
                  <Checkbox checked={selected} onChange={() => onToggleCategory(item)} />

                  <LegendText>
                    <Circle color={mapSensorTypeToColor[item]} />{' '}
                    {`${item} ${!selected ? `(${filter.sensorTypeCount[item] || 0})` : ''}`}
                  </LegendText>
                </LegendItem>
              );
            })}
          </Accordion>
        </LegendSection>
      )}

      {legend &&
        otherCategories.map((categoryName) => (
          <LegendSection key={categoryName}>
            <Accordion id={categoryName} title={categoryName} isOpen>
              {legend[categoryName].map((item) => {
                const selected = selectedItems?.includes(item);

                return (
                  <div key={item}>
                    <Checkbox checked={selected} onChange={() => onToggleCategory(item)} />
                    <span>{`${item} ${
                      /* @ts-ignore */
                      !selected ? `(${filter[mapLegendToProperties[categoryName]][item]})` : ''
                    }`}</span>
                  </div>
                );
              })}
            </Accordion>
          </LegendSection>
        ))}
    </>
  );
};

export default MapLegend;
