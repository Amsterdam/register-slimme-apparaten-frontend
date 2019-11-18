import React from 'react';
import { shallow } from 'enzyme';

import { isAuthenticated } from 'shared/services/auth/auth';
import { HeaderContainer } from './index';

jest.mock('shared/services/auth/auth');

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
    isAuthenticated.mockImplementation(() => true);

    const renderedComponent = shallow(<HeaderContainer {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
