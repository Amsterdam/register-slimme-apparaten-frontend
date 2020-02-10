import styled from '@datapunt/asc-core';
import { breakpoint } from '@datapunt/asc-ui';

export const MapContainerStyle = styled.div`
  width: 100%;
  height: calc(100vh - 52px);

  @media screen and ${breakpoint('max-width', 'tabletS')} {
    height: calc(100vh);
  }

  #mapdiv {
    width: 100%;
    height: calc(100vh - 52px);

    @media screen and ${breakpoint('max-width', 'tabletS')} {
      height: calc(100vh);
    }
  }
`;
