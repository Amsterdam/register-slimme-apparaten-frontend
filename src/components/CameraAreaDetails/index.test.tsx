import React from 'react';
import { render } from '@testing-library/react';
import { withAppContext } from 'test/utils';

import CameraAreaDetails , { Props } from '.';

describe('CameraAreaDetails', () => {
  const props:Props = {
    device: {
      propertes: {
        oov_naam: 'Rokin',
      },
    },
    onDeviceDetailsClose: jest.fn(),
  };
  it('should render', () => {
    const { queryByText } = render(
      withAppContext(<CameraAreaDetails {...props} />)
    );

    expect(queryByText(props.device.propertes.oov_naam)).toBeInTheDocument();
  });
});
