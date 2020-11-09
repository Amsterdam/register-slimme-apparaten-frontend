import React from 'react';
import { render } from '@testing-library/react';
import { withAppContext } from 'test/utils';

import DeviceDetails , { Props } from '.';

describe('DeviceDetails', () => {
  const props:Props = {
    device: {
      id: 42,
      soort: 'Luchtkwaliteit',
      category: 'Sensor',
      privacy: 'privacy',
      contact: 'iothings',
      organisation: 'GGD Amsterdam',
    },
    onDeviceDetailsClose: jest.fn(),
  };
  it('should render', () => {
    const { queryByText } = render(
      withAppContext(<DeviceDetails {...props} />)
    );

    expect(queryByText(props.device.soort)).toBeInTheDocument();
    expect(queryByText(props.device.category)).toBeInTheDocument();
    expect(queryByText(props.device.privacy)).toBeInTheDocument();
    expect(queryByText(props.device.organisation)).toBeInTheDocument();

    expect(queryByText(props.device.contact)).not.toBeInTheDocument();
  });
});
