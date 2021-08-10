import React, { Fragment } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Header, MenuItem, MenuButton, themeSpacing, breakpoint, themeColor } from '@amsterdam/asc-ui';
import APP_ROUTES from '../../services/appRoutes';

const HeaderWrapper = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
  padding-left: ${themeSpacing(2)};
  background-color: ${themeColor('tint', 'level1')};

  h1 a:first-child {
    display: none;
  }

  a {
    color: ${themeColor('tint', 'level7')};
    text-decoration: none;

    :hover {
      color: ${themeColor('secondary')};
    }
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
            <MenuButton forwardedAs="a">
              <NavLink to={APP_ROUTES.HOME}>Kaart</NavLink>
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs="a">
              <NavLink to={APP_ROUTES.CATEGORIES}>Type apparaten</NavLink>
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs="a">
              <NavLink to={APP_ROUTES.ABOUT_FAQ}>Veelgevraagd</NavLink>
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs="a">
              <NavLink to={APP_ROUTES.ABOUT}>Over dit register</NavLink>
            </MenuButton>
          </MenuItem>
        </Fragment>
      }
    ></Header>
  </HeaderWrapper>
);

export default HeaderContainer;
