import React from 'react';
import * as reactRouterDom from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { withAppContext } from 'test/utils';
import APP_ROUTES from '../../services/appRoutes';

import DeviceDetails , { Props } from '.';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: '?id=Stationseiland',
  }),
}));

describe('DeviceDetails', () => {
  it('should render device', () => {
    const props:Props = {
      device: {
        id: 42,
        soort: 'Luchtkwaliteit',
        category: 'Sensor',
        contact: 'iothings',
        organisation: 'GGD Amsterdam',
        privacy: 'https://www.amsterdam.nl/privacy/specifieke/privacyverklaringen-b/vaarwegbeheer/',
      },
      selectedLayer: 'devices',
      onDeviceDetailsClose: jest.fn(),
    };

    const { queryByText, queryByTestId } = render(
      withAppContext(<DeviceDetails {...props} />)
    );

    expect(queryByText('Apparaat')).toBeInTheDocument();
    expect(queryByText(props.device.soort)).toBeInTheDocument();
    expect(queryByText(props.device.category)).toBeInTheDocument();
    expect(queryByText(props.device.privacy)).toBeInTheDocument();
    expect(queryByText(props.device.organisation)).toBeInTheDocument();

    expect(queryByTestId('closeButton')).toBeInTheDocument();
    expect(queryByTestId('categoriesButton')).toBeInTheDocument();
    expect(queryByTestId('contactButton')).toBeInTheDocument();
  });

  it('should render area cameras', () => {
    const props:Props = {
      device: {
        id: 42,
        properties: {
          display: 'Karel Doormanplein',
        },
      },
      selectedLayer: 'cameras',
      onDeviceDetailsClose: jest.fn(),
    };


    const { queryByText, queryByTestId } = render(
      withAppContext(<DeviceDetails {...props} />)
    );

    expect(queryByText('Gebied')).toBeInTheDocument();
    expect(queryByText(props.device?.properties?.display)).toBeInTheDocument();
    expect(queryByText('Camera toezichtsgebied')).toBeInTheDocument();

    expect(queryByTestId('closeButton')).toBeInTheDocument();
    expect(queryByTestId('categoriesButton')).toBeInTheDocument();
    expect(queryByTestId('contactButton')).not.toBeInTheDocument();
  });

  describe('events', () => {
    const push = jest.fn();
    let props: Props;

    beforeEach(() => {
      props = {
        device: {
          id: 42,
          soort: 'Luchtkwaliteit',
          category: 'Sensor',
        },
        selectedLayer: 'devices',
        onDeviceDetailsClose: jest.fn(),
      };

      jest.resetAllMocks();
      jest.spyOn(reactRouterDom, 'useHistory').mockImplementation(() => ({
        push,
      }));
    });

    it('should close the panel', () => {
      const { queryByTestId } = render(
        withAppContext(<DeviceDetails {...props} />)
      );

      fireEvent.click(queryByTestId('closeButton'));

      expect(props.onDeviceDetailsClose).toHaveBeenCalled();
    });

    it('should trigger categories', () => {
      const { queryByTestId } = render(
        withAppContext(<DeviceDetails {...props} />)
      );

      fireEvent.click(queryByTestId('categoriesButton'));

      expect(push).toHaveBeenCalledWith(APP_ROUTES.CATEGORIES);
    });

    it('should trigger contact', () => {
      const { queryByTestId } = render(
        withAppContext(<DeviceDetails {...props} />)
      );

      fireEvent.click(queryByTestId('contactButton'));

      expect(push).toHaveBeenCalledWith(`${APP_ROUTES.CONTACT}/?id=Stationseiland`);
    });
  });
});
