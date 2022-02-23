/**
 * Testing the NotFoundPage
 */
// eslint-disable-next-line jest/no-mocks-import
import '../../__mocks__/matchMedia';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@amsterdam/asc-ui';

import NotFound from './index';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ThemeProvider>
          <NotFound />
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
