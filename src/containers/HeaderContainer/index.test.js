import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { HeaderContainer } from './index';

describe('<HeaderContainer />', () => {
  let props;

  beforeEach(() => {
    props = {
      userName: 'user',
      onLogin: jest.fn(),
      onLogout: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly when authenticated', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HeaderContainer {...props} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
