import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Header, Link, MenuItem, MenuButton, themeSpacing, breakpoint } from '@amsterdam/asc-ui';
import APP_ROUTES from '../../services/appRoutes';

const HeaderLink = styled(Link)`
  margin-right: ${themeSpacing(5)};
`;

const HeaderWrapper = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
  padding-left: 8px;
  background-color: white;

  h1 a:first-child {
    display: none;
  }

  @media screen and ${breakpoint('max-width', 'tabletS')} {
    display: none;
  }
`;

export const HeaderContainer = () => (
  <HeaderWrapper>
    <Header
      tall={false}
      title="Register slimme apparaten"
      homeLink="/"
      fullWidth
      navigation={
        <Fragment>
          <MenuItem>
            <MenuButton forwardedAs="a" href={APP_ROUTES.HOME}>
              Kaart
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs="a" href={APP_ROUTES.CATEGORIES}>
              Type apparaten
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs="a" href={APP_ROUTES.ABOUT_FAQ}>
              Veelgevraagd
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs="a" href={APP_ROUTES.ABOUT}>
              Over dit register
            </MenuButton>
          </MenuItem>
        </Fragment>
      }
    ></Header>
  </HeaderWrapper>
);

export default HeaderContainer;
