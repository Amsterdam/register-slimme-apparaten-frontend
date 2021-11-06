import React from 'react';
import { shallow } from 'enzyme';

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
    const renderedComponent = shallow(<HeaderContainer {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
