import React from 'react';
import styled from 'styled-components';
import { Accordion, Checkbox, themeSpacing } from '@amsterdam/asc-ui';
import { LegendCategories } from 'utils/types';

const LegendSection = styled('section')`
  margin-bottom: ${themeSpacing(3)};
`;

export interface Props {
  legend: Record<string, string[]> | null;
  selectedItems: string[] | null;
  onToggleCategory: (name: string) => void;
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

const mapSensorTypeToColor: { [key: string]: string } = {
  'Aanwezigheid of nabijheidsensor': '#FF0000',
  Temperatuursensor: '#008080',
  Dichtheidssensor: '#808000',
  Druksensor: '#0000FF',
  'Positie- of verplaatsingsensor': '#FF00FF',
  'Vloeistof- en gasstroomsensor': '#800080',
  Electriciteitssensor: ' #800000',
  Chemiesensor: '#000000',
  Klimaatsensor: '#FF000F',
  Geluidsensor: '#FF00F0',
  'Optische / camera sensor': '#FF0F00',
};

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const LegendText = styled.span`
  display: flex;
  align-items: center;
`;

const MapLegend: React.FC<Props> = ({ legend, selectedItems, onToggleCategory }) => {
  const otherCategories =
    (legend && Object.keys(legend).filter((category) => category !== LegendCategories['Sensor type'])) || [];

  return (
    <>
      <h2>Legenda</h2>
      {/* Because of the color legend we map sensor types seperatly */}
      {legend && (
        <LegendSection>
          <Accordion id={LegendCategories['Sensor type']} title={LegendCategories['Sensor type']} isOpen>
            {legend[LegendCategories['Sensor type']].map((item: string) => (
              <LegendItem key={item}>
                <Checkbox checked={selectedItems?.includes(item)} onChange={() => onToggleCategory(item)} />

                <LegendText>
                  <Circle color={mapSensorTypeToColor[item]} /> {item}
                </LegendText>
              </LegendItem>
            ))}
          </Accordion>
        </LegendSection>
      )}

      {legend &&
        otherCategories.map((categoryName) => (
          <LegendSection key={categoryName}>
            <Accordion id={categoryName} title={categoryName} isOpen>
              {legend[categoryName].map((item) => (
                <div key={item}>
                  <Checkbox checked={selectedItems?.includes(item)} onChange={() => onToggleCategory(item)} />

                  <span>{item}</span>
                </div>
              ))}
            </Accordion>
          </LegendSection>
        ))}
    </>
  );
};

export default MapLegend;
