import React from 'react';
import { render } from '@testing-library/react';
import { withAppContext } from 'test/utils';

import CameraAreaDetails , { Props } from '.';

describe('CameraAreaDetails', () => {
  const props:Props = {
    device: {
      id: 42,
      properties: {
        display: 'Wallen Nieuwendijk',
      },
    },
    onDeviceDetailsClose: jest.fn(),
  };

  it('should render', () => {
    const { queryByText } = render(
      withAppContext(<CameraAreaDetails {...props} />)
    );

    expect(queryByText('Camera toezichtsgebied')).toBeInTheDocument();
    expect(queryByText(props.device.properties.display)).toBeInTheDocument();
  });
});
