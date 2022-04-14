import styled from 'styled-components';
import { themeSpacing, Button } from '@amsterdam/asc-ui';
import { ChevronDown } from '@amsterdam/asc-assets';
import LegendOption from './LegendOption';
import { useState } from 'react';

const SubSection = styled.div`
  padding-left: ${themeSpacing(4)};
`;

const SectionWrapper = styled.div``;

const LegendOptionWithIcon = styled.div`
  > label {
    width: calc(100% - 20px);
  }

  display: flex;
  align-items: center;
`;

const InvisibleButton = styled.button`
  text-decoration: none;
  background-color: unset;
  color: inherit;
  border: none;
  padding: 0px;
`;

const LegendOptions = ({
  options,
  selectedItems,
  onToggleCategory,
  filter,
}: {
  options: string[] | { [key: string]: string[] };
  selectedItems: string[] | null;
  onToggleCategory: (option: string | string[], select: boolean) => void;
  filter: { [key: string]: number };
}) => {
  const [showSubsection, setShowSubsection] = useState<boolean>(true);

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
                  <InvisibleButton onClick={() => setShowSubsection(!showSubsection)}>
                    <ChevronDown width={20} height={20} />
                  </InvisibleButton>
                </LegendOptionWithIcon>
                {showSubsection && (
                  <SubSection>
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
                )}
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
