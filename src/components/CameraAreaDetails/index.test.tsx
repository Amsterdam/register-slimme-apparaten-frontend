import React from 'react';
import { render } from '@testing-library/react';
import { withAppContext } from 'test/utils';

import CameraAreaDetails , { Props } from '.';

describe('CameraAreaDetails', () => {
  const props:Props = {
    device: {
      properties: {
        oov_naam: 'Rokin',
      },
    },
    onDeviceDetailsClose: jest.fn(),
  };
  it('should render', () => {
    const { queryByText } = render(
      withAppContext(<CameraAreaDetails {...props} />)
    );

    expect(queryByText(props.device.properties.oov_naam)).toBeInTheDocument();
  });
});
