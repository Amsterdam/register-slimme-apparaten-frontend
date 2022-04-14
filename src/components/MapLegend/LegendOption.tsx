import styled from 'styled-components';
import { Checkbox, themeColor } from '@amsterdam/asc-ui';

const LegendItem = styled.label`
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
  onToggleCategory: (option: string, select: boolean) => void;
}) => {
  return (
    <LegendItem htmlFor={text}>
      <Checkbox
        id={text}
        checked={selected}
        onChange={() => onToggleCategory(text, !selected)}
        disabled={resultCount === 0 && !selected}
      />
      <LegendText noResults={resultCount === 0}>
        {children}
        {`${text} ${!selected ? `(${resultCount})` : ''}`}
      </LegendText>
    </LegendItem>
  );
};

export default LegendOption;
