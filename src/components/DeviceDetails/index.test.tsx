import React from 'react';
import { render } from '@testing-library/react';
import { withAppContext } from 'test/utils';

import DeviceDetails , { Props } from '.';

describe('DeviceDetails', () => {
  it('should render device', () => {
    const props:Props = {
      device: {
        id: 42,
        soort: 'Luchtkwaliteit',
        category: 'Sensor',
        privacy: 'privacy',
        contact: 'iothings',
        organisation: 'GGD Amsterdam',
      },
      isAreaCamera: false,
      onDeviceDetailsClose: jest.fn(),
    };

    const { queryByText } = render(
      withAppContext(<DeviceDetails {...props} />)
    );

    expect(queryByText('Apparaat')).toBeInTheDocument();
    expect(queryByText(props.device?.soort)).toBeInTheDocument();
    expect(queryByText(props.device.category)).toBeInTheDocument();
    expect(queryByText(props.device.privacy)).toBeInTheDocument();
    expect(queryByText(props.device.organisation)).toBeInTheDocument();
  });

  it('should render area cameras', () => {
    const props:Props = {
      device: {
        id: 42,
        soort: 'Luchtkwaliteit',
        category: 'Sensor',
        privacy: 'privacy',
        contact: 'iothings',
        organisation: 'GGD Amsterdam',
        properties: {
          display: 'Karel Doormanplein',
        },
      },
      isAreaCamera: true,
      onDeviceDetailsClose: jest.fn(),
    };


    const { queryByText } = render(
      withAppContext(<DeviceDetails {...props} />)
    );

    expect(queryByText('Gebied')).toBeInTheDocument();
    expect(queryByText(props.device?.properties?.display)).toBeInTheDocument();
    expect(queryByText('Camera toezichtsgebied')).toBeInTheDocument();
  });
});
