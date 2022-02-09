import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@amsterdam/asc-ui';

import DeviceDetails, { Props } from '.';
import { SensorTypes } from '../../utils/types';

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
  };
  it('should render', () => {
    const { queryByText, getByText } = render(
      <ThemeProvider>
        <DeviceDetails {...props} />
      </ThemeProvider>,
    );

    expect(queryByText(props.feature.properties.sensorType)).toBeInTheDocument();
    expect(getByText('Privacyverklaring')).toHaveAttribute('href', props.feature.properties.privacy);
    expect(queryByText(props.feature.properties.organisation)).toBeInTheDocument();

    expect(queryByText(props.feature.properties.contact.name)).toBeInTheDocument();
    expect(queryByText(props.feature.properties.contact.email)).toBeInTheDocument();

    expect(queryByText(props.feature.properties.legalGround)).toBeInTheDocument();
  });
});
