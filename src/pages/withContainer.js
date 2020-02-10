import React, { Fragment } from 'react';
import { Row, Column, Container, themeColor } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
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
        <Column span={10} push={1}>
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
