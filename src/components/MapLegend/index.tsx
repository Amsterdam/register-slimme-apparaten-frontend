import React from 'react';
import styled from 'styled-components';
import { Accordion, Button, Checkbox, themeColor, themeSpacing } from '@amsterdam/asc-ui';
import { LegendCategories, mapSensorTypeToColor } from '../../utils/types';
import { SensorFilter } from '../../classes/SensorFilter';

const LegendSection = styled('section')`
  margin-bottom: ${themeSpacing(3)};
`;

export interface Props {
  legend: Record<string, string[]> | null;
  selectedItems: string[] | null;
  onToggleCategory: (name: string | string[]) => void;
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

interface LegendTextProps {
  readonly noResults?: boolean;
}

const LegendText = styled.span<LegendTextProps>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.noResults ? themeColor('tint', 'level4') : themeColor('tint', 'level7'))};
`;

const ToggleButton = styled(Button)`
  margin-bottom: ${themeSpacing(4)};
`;

const mapLegendToProperties = {
  [LegendCategories.Thema]: 'themeCount',
  [LegendCategories['Verwerkt persoonsgegevens']]: 'piCount',
  [LegendCategories.Eigenaar]: 'ownerCount',
};

const LegendOption = ({
  children,
  selected,
  resultCount,
  text,
  onToggleCategory,
}: {
  children?: JSX.Element;
  selected: boolean;
  resultCount: number;
  text: string;
  onToggleCategory: (option: string) => void;
}) => {
  return (
    <LegendItem>
      <Checkbox checked={selected} onChange={() => onToggleCategory(text)} disabled={resultCount === 0} />
      <LegendText noResults={resultCount === 0}>
        {children}
        {`${text} ${!selected ? `(${resultCount})` : ''}`}
      </LegendText>
    </LegendItem>
  );
};

const MapLegend: React.FC<Props> = ({ legend, selectedItems, onToggleCategory, filter }) => {
  const otherCategories =
    (legend && Object.keys(legend).filter((category) => category !== LegendCategories['Sensor type'])) || [];

  return (
    <>
      <h2>Legenda</h2>
      <ToggleButton
        variant="textButton"
        onClick={() => {
          if (selectedItems) {
            onToggleCategory(selectedItems);
          }
        }}
      >
        Reset alle filters
      </ToggleButton>
      {/* Because of the color legend we map sensor types seperatly */}
      {legend && (
        <LegendSection>
          <Accordion id={LegendCategories['Sensor type']} title={LegendCategories['Sensor type']} isOpen>
            {legend[LegendCategories['Sensor type']].map((item: string) => {
              return (
                <LegendOption
                  onToggleCategory={onToggleCategory}
                  resultCount={filter.sensorTypeCount[item] || 0}
                  selected={selectedItems?.includes(item) || false}
                  text={item}
                  key={item}
                >
                  <Circle color={mapSensorTypeToColor[item]} />
                </LegendOption>
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
                return (
                  <LegendOption
                    onToggleCategory={onToggleCategory}
                    resultCount={
                      /* @ts-ignore */
                      filter[mapLegendToProperties[categoryName]][item] || 0
                    }
                    selected={selectedItems?.includes(item) || false}
                    text={item}
                    key={item}
                  ></LegendOption>
                );
              })}
            </Accordion>
          </LegendSection>
        ))}
    </>
  );
};

export default MapLegend;
