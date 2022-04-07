import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@amsterdam/asc-ui';

import DeviceDetails, { Props } from '.';
import { SensorTypes } from '../../utils/types';

jest.mock('../../services/regions', () => {
  return {
    useRegions: jest.fn(),
    __esModule: true,
  };
});

describe('DeviceDetails', () => {
  const props: Props = {
    feature: {
      properties: {
        sensorType: SensorTypes.Chemiesensor,
        organisation: 'GGD Amsterdam',
        privacy: 'privacy',
        contact: { name: 'Amsterdam Contact', email: 'email@amsterdam.nl' },
        legalGround: 'legalGround',
      },
    },
    onClose: () => {},
  };
  it('should render', () => {
    render(
      <ThemeProvider>
        <DeviceDetails {...props} />
      </ThemeProvider>,
    );

    expect(screen.getByText(props.feature.properties.sensorType)).toBeInTheDocument();
    expect(screen.getByText('Privacyverklaring')).toHaveAttribute('href', props.feature.properties.privacy);
    expect(screen.getByText(props.feature.properties.organisation)).toBeInTheDocument();

    expect(screen.getByText(props.feature.properties.contact.name)).toBeInTheDocument();
    expect(screen.getByText(props.feature.properties.contact.email)).toBeInTheDocument();

    expect(screen.getByText(props.feature.properties.legalGround)).toBeInTheDocument();
  });
});
