import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import escapeRegExp from 'lodash/escapeRegExp';
import Fuse from 'fuse.js';
import styled from 'styled-components';
import { SearchBar, themeSpacing } from '@amsterdam/asc-ui';
import { Sensor } from '../../classes/Sensor';

const Results = styled.div`
  background-color: white;
  width: 232px;

  border: 1px solid black;

  padding-top: ${themeSpacing(3)};
  padding-bottom: ${themeSpacing(3)};

  p,
  a {
    display: block;
    margin: 0;
    padding: ${themeSpacing(1)};
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  em {
    font-weight: 600;
  }
`;

const SeachContainer = styled.div`
  align-self: flex-start;
  margin-left: ${themeSpacing(3)}};
  pointer-events: all;
`;

const StyledSearchBar = styled(SearchBar)`
  width: 280px;

  input {
    height: 44px !important;
  }

  & > button {
    width: 44px !important;
    height: 44px !important;
  }
`;

export function displayPath(term: string, segment: string) {
  const termSplitted = term.trim().split(/\s+/g);

  let segmentReplaced = segment;
  termSplitted.forEach((term) => {
    const replaced = segmentReplaced.replace(new RegExp(escapeRegExp(term), 'ig'), `<em>$&</em>`);
    if (replaced) {
      segmentReplaced = replaced;
    }
  });

  return <span className={''} dangerouslySetInnerHTML={{ __html: segmentReplaced }}></span>;
}

const fuseOptions = {
  threshold: 0.4,
  minMatchCharLength: 2,
  keys: ['feature.properties.reference'],
};

const SRSearchBar = ({ sensors }: { sensors: Sensor[] }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const setDebouncedSearchTerm = useDebouncedCallback(setSearchTerm, 150);

  const searchResult = useMemo(() => {
    const fuseInstance = new Fuse(sensors, fuseOptions);

    return fuseInstance.search(searchTerm).slice(0, 15);
  }, [searchTerm, sensors]);

  return (
    <SeachContainer>
      <StyledSearchBar onChange={(e) => setDebouncedSearchTerm(e.target.value)} value={searchTerm} />
      {searchTerm.length > 0 && sensors.length > 0 && (
        <Results>
          {searchResult.length > 0 &&
            searchResult
              .map((s) => s.item)
              .map((s) => (
                <a
                  key={s.feature.properties?.reference}
                  href={`/?sensor=${encodeURIComponent(JSON.stringify(s.feature.geometry.coordinates))}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchTerm('');
                    navigate(
                      `/?sensor=${encodeURIComponent(
                        JSON.stringify([s.feature.geometry.coordinates[1], s.feature.geometry.coordinates[0]]),
                      )}`,
                    );
                  }}
                >
                  {displayPath(searchTerm, s.feature.properties?.reference)}
                </a>
              ))}
          {searchResult.length === 0 && <p>Geen sensoren gevonden.</p>}
        </Results>
      )}
    </SeachContainer>
  );
};

export default SRSearchBar;
