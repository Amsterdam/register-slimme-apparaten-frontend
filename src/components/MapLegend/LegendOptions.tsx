import { Fragment } from 'react';
import styled from 'styled-components';
import { themeSpacing } from '@amsterdam/asc-ui';
import LegendOption from './LegendOption';

const SubSection = styled('div')`
  padding-left: ${themeSpacing(4)};
`;

const LegendOptions = ({
  options,
  selectedItems,
  onToggleCategory,
  filter,
}: {
  options: string[] | { [key: string]: string[] };
  selectedItems: string[] | null;
  onToggleCategory: (option: string) => void;
  filter: { [key: string]: number };
}) => {
  return (
    <>
      {Array.isArray(options)
        ? options.map((item) => {
            return (
              <LegendOption
                onToggleCategory={onToggleCategory}
                resultCount={filter[item] || 0}
                selected={selectedItems?.includes(item) || false}
                text={item}
                key={item}
              ></LegendOption>
            );
          })
        : Object.keys(options).map((k) => {
            const subItems = options[k];

            return subItems?.length > 0 ? (
              <Fragment key={`section-${k}`}>
                <LegendOption
                  onToggleCategory={onToggleCategory}
                  resultCount={filter[k] || 0}
                  selected={selectedItems?.includes(k) || false}
                  text={k}
                ></LegendOption>
                <SubSection>
                  {subItems.map((item) => (
                    <LegendOption
                      onToggleCategory={onToggleCategory}
                      resultCount={filter[item] || 0}
                      selected={selectedItems?.includes(item) || false}
                      text={item}
                      key={item}
                    ></LegendOption>
                  ))}
                </SubSection>
              </Fragment>
            ) : (
              <LegendOption
                onToggleCategory={onToggleCategory}
                resultCount={filter[k] || 0}
                selected={selectedItems?.includes(k) || false}
                text={k}
                key={k}
              ></LegendOption>
            );
          })}
    </>
  );
};

export default LegendOptions;
