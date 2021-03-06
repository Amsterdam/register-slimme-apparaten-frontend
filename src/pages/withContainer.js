import React, { Fragment } from 'react';
import { Row, Column, Container, themeColor } from '@amsterdam/asc-ui';
import styled from 'styled-components';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';

const StyledContainer = styled(Container)`
  background-color: ${themeColor('tint', 'level1')};
  position: relative;
  margin: 0;
  min-height: 60vh;
`;

const withContainer = Component => ({ ...otherProps }) => (
  <Fragment>
    <HeaderContainer />
    <StyledContainer>
      <Row hasMargin={false}>
        <Column span={12}></Column>
      </Row>
      <Row>
        <Column span={12}>
          <Component {...otherProps} />
        </Column>
      </Row>
      <Row>
        <Column span={12}></Column>
      </Row>
    </StyledContainer>
    <Footer />
  </Fragment>
);

export default withContainer;
