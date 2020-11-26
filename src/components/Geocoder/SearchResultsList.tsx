import React, { useCallback } from 'react'
import 'leaflet/dist/leaflet.css'
import { Link } from '@amsterdam/asc-ui'
import styled from 'styled-components';
import SearchResultsListStyle from './SearchResultsListStyle'

interface Active {
  active?: boolean
}

const StyledLink = styled(Link)<Active>`
  // @ts-ignore
  font-weight: ${({ active }) => (active ? 700 : 400)};

  &:hover {
    font-weight: 700;
    cursor: pointer;
  }
`

const SearchResultsListItem = ({
  id,
  name,
  selected,
  index,
  onSelect,
}: any) => (
  <li>
    <StyledLink
      id={id}
      active={index === selected}
      variant="blank"
      onClick={() => onSelect(index)}
    >
      {name}
    </StyledLink>
  </li>
)

const SearchResultsList = ({ items, selected, onSelect }: any) => {
  const handleSelectedLink = useCallback(
    index => {
      onSelect(index)
    },
    [onSelect],
  )

  return (
    items && (
      <SearchResultsListStyle>
        <ul>
          {items &&
            items.map(({ id, name }: any, index: number) => (
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
  )
}

export default SearchResultsList
