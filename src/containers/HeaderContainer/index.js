import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Header, MenuItem, MenuButton, themeSpacing, breakpoint, themeColor } from '@amsterdam/asc-ui';
import APP_ROUTES from '../../services/appRoutes';

const HeaderWrapper = styled.div`
  z-index: 410;
  position: sticky;
  top: 0;
  padding-left: ${themeSpacing(2)};
  padding-bottom: ${themeSpacing(1)};
  background-color: ${themeColor('tint', 'level1')};

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
            <MenuButton forwardedAs={Link} to={APP_ROUTES.HOME}>
              Kaart
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs={Link} to={APP_ROUTES.CATEGORIES}>
              Type apparaten
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs={Link} to={APP_ROUTES.ABOUT_FAQ}>
              Veelgevraagd
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton forwardedAs={Link} to={APP_ROUTES.ABOUT}>
              Over dit register
            </MenuButton>
          </MenuItem>
        </Fragment>
      }
    ></Header>
  </HeaderWrapper>
);

export default HeaderContainer;
