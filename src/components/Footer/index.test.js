import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@amsterdam/asc-ui';

import Footer from './index';
import './style.scss';

describe('<Footer />', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Footer />
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
