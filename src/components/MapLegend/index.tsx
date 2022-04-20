import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Accordion, Button, themeSpacing } from '@amsterdam/asc-ui';
import { LegendCategories, mapSensorTypeToColor, SortedResults } from '../../utils/types';
import { SensorFilter } from '../../classes/SensorFilter';
import LegendOption from './LegendOption';
import LegendOptions from './LegendOptions';

const LegendSection = styled('section')`
  margin-bottom: ${themeSpacing(3)};
`;

export interface Props {
  legend: SortedResults | null;
  selectedItems: string[] | null;
  onToggleCategory: (name: string | string[], select: boolean) => void;
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

const ToggleButton = styled(Button)`
  margin-bottom: ${themeSpacing(4)};
`;

const MapLegend: React.FC<Props> = ({ legend, selectedItems, onToggleCategory, filter }) => {
  const otherCategories =
    ((legend &&
      Object.keys(legend).filter((category) => category !== LegendCategories['Sensor type'])) as LegendCategories[]) ||
    [];

  return (
    <>
      <h2>Legenda</h2>
      <ToggleButton
        variant="textButton"
        onClick={() => {
          if (selectedItems) {
            onToggleCategory(selectedItems, false);
          }
        }}
      >
        Reset alle filters
      </ToggleButton>

      <p className="sr-result-count">{filter.sensors.length} resultaten</p>

      {/* Because of the color legend we map sensor types seperatly */}
      {legend && (
        <LegendSection>
          <Accordion id={LegendCategories['Sensor type']} title={LegendCategories['Sensor type']} isOpen>
            {
              /* @ts-ignore */
              legend[LegendCategories['Sensor type']].map((item) => {
                if (Array.isArray(item)) {
                  return <></>;
                }

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
              })
            }
          </Accordion>
        </LegendSection>
      )}

      {legend &&
        otherCategories.map((categoryName) => (
          <Fragment key={categoryName}>
            {/* Only show category when there is something to choose (e.g. more than 1 item). */}
            {((Array.isArray(legend[categoryName]) && legend[categoryName].length > 1) ||
              Object.keys(legend[categoryName]).length > 1) && (
              <LegendSection key={categoryName}>
                <Accordion id={(categoryName as string).split(' ').join('')} title={categoryName} isOpen>
                  <LegendOptions
                    id={categoryName}
                    options={legend[categoryName]}
                    filter={filter.getCountForCategory(categoryName)}
                    onToggleCategory={onToggleCategory}
                    selectedItems={selectedItems}
                  />
                </Accordion>
              </LegendSection>
            )}
          </Fragment>
        ))}
    </>
  );
};

export default MapLegend;
