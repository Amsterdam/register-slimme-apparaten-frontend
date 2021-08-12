import React, { useCallback, FunctionComponent /* DetailedHTMLProps, HTMLLIElement, LiHTMLAttributes */ } from 'react';
// @ts-ignore
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { Link } from '@amsterdam/asc-ui';
import SearchResultsListStyle from './SearchResultsListStyle';

interface LinkProps {
  active?: boolean;
}

const StyledLink = styled(Link)<LinkProps>`
  // @ts-ignore
  font-weight: ${({ active }) => (active ? 700 : 400)};

  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
`;

interface ItemProps {
  id: string;
  name: string;
  selected: number;
  index: number;
  onSelect: (index: number) => void;
}

const SearchResultsListItem: FunctionComponent<ItemProps> = ({ id, name, selected, index, onSelect }) => (
  <li>
    <StyledLink id={id} active={index === selected} variant="blank" onClick={() => onSelect(index)}>
      {name}
    </StyledLink>
  </li>
);

interface Props {
  items: [];
  selected: number;
  onSelect: (index: number) => void;
}

const SearchResultsList: FunctionComponent<Props> = ({ items, selected, onSelect }) => {
  const handleSelectedLink = useCallback(
    (index) => {
      onSelect(index);
    },
    [onSelect],
  );

  return (
    items && (
      <SearchResultsListStyle>
        <ul>
          {items &&
            items.map(({ id, name }, index: number) => (
              <SearchResultsListItem
                key={id}
                id={id}
                name={name}
                index={index}
                selected={selected}
                onSelect={handleSelectedLink}
              />
            ))}
        </ul>
      </SearchResultsListStyle>
    )
  );
};

export default SearchResultsList;
