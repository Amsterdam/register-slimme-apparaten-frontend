import styled, { css } from 'styled-components';
import { themeSpacing } from '@amsterdam/asc-ui';
import { ChevronDown } from '@amsterdam/asc-assets';
import LegendOption from './LegendOption';
import { useState } from 'react';

const SubSection = styled.div<{ visible: boolean }>`
  padding-left: ${themeSpacing(4)};
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;

  ${({ visible }) =>
    visible &&
    css`
      max-height: 300px;
      transition: max-height 0.25s ease-in;
    `}
`;

const SectionWrapper = styled.div``;

const LegendOptionWithIcon = styled.div`
  > label {
    width: calc(100% - 20px);
  }

  display: flex;
  align-items: center;
`;

const InvisibleButton = styled.button<{ toggle: boolean }>`
  text-decoration: none;
  background-color: unset;
  color: inherit;
  border: none;
  padding: 0px;

  > * {
    transition: transform 0.25s;

    ${({ toggle }) =>
      toggle &&
      css`
        transform: rotate(180deg);
      `}
  }
`;

const LegendOptions = ({
  id,
  options,
  selectedItems,
  onToggleCategory,
  filter,
}: {
  id: string;
  options: string[] | { [key: string]: string[] };
  selectedItems: string[] | null;
  onToggleCategory: (option: string | string[], select: boolean) => void;
  filter: { [key: string]: number };
}) => {
  const [showSubsection, setShowSubsection] = useState<boolean>(true);

  // id's used in aria-* cant have spaces in them.
  const accessibleId = id?.split(' ')?.join();

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
              <SectionWrapper key={`section-${k}`}>
                <LegendOptionWithIcon>
                  <LegendOption
                    onToggleCategory={onToggleCategory}
                    resultCount={filter[k] || 0}
                    selected={selectedItems?.includes(k) || false}
                    text={k}
                  ></LegendOption>
                  <InvisibleButton
                    title={`Toon ${showSubsection ? 'minder' : 'meer'} filter opties`}
                    aria-controls={accessibleId}
                    aria-expanded={showSubsection}
                    toggle={showSubsection}
                    onClick={() => setShowSubsection(!showSubsection)}
                  >
                    <ChevronDown width={20} height={20} />
                  </InvisibleButton>
                </LegendOptionWithIcon>

                <SubSection visible={showSubsection} id={accessibleId}>
                  {subItems.map((item) => (
                    <LegendOption
                      onToggleCategory={() => {
                        onToggleCategory(
                          selectedItems?.includes(item) ? item : [k, item],
                          !selectedItems?.includes(item),
                        );
                      }}
                      resultCount={filter[item] || 0}
                      selected={selectedItems?.includes(item) || false}
                      text={item}
                      key={item}
                    ></LegendOption>
                  ))}
                </SubSection>
              </SectionWrapper>
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
