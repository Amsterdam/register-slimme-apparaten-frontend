import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Link, themeSpacing, breakpoint } from '@amsterdam/asc-ui';
import APP_ROUTES from '../../services/appRoutes';

const HeaderLink = styled(Link)`
  margin-right: ${themeSpacing(5)};
`;

const HeaderWrapper = styled.div`
  z-index: 1;
  position: sticky;
  top:0;

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
          <div>
            <HeaderLink $as={NavLink} to={APP_ROUTES.HOME} variant="blank">
              Kaart
            </HeaderLink>
            <HeaderLink $as={NavLink} to={APP_ROUTES.CATEGORIES} variant="blank">
              Type apparaten
            </HeaderLink>
            <HeaderLink $as={NavLink} to={APP_ROUTES.ABOUT_FAQ} variant="blank">
              Veelgevraagd
            </HeaderLink>
            <HeaderLink $as={NavLink} to={APP_ROUTES.ABOUT} variant="blank">
              Over dit register
            </HeaderLink>
          </div>
        </Fragment>
      }
    ></Header>
  </HeaderWrapper>
);

export default HeaderContainer;
