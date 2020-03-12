import APP_ROUTES from 'services/appRoutes';

import { Device } from '../..';

import convertor from '.';

describe('convertor', () => {
  it('should convert devices', () => {
    const device: Device = {
      id: 42,
      category: 'Slimme verkeersinformatie',
      soort: 'Amstelsluizen',
      organisation: 'GGD Amsterdam',
      privacy: 'https://www.amsterdam.nl/privacy/specifieke/privacyverklaringen-b/vaarwegbeheer/',
    };

    expect(convertor.devices.getData(device)).toEqual({
      title: 'Apparaat',
      hasOwner: true,
      props: [
        {
          key: 'Categorie',
          value: device.category,
          buttonAction: APP_ROUTES.CATEGORIES,
        },
        {
          key: 'Type',
          value: device.soort,
        },
        {
          key: 'Organisatie',
          value: device.organisation,
        },
        {
          key: 'Privacyverklaring',
          value: device.privacy,
          isLink: true,
        },
      ],
    });
  });

  it('should convert cameras', () => {
    const device: Device = {
      id: 42,
      properties: {
        display: 'Stationseiland',
      },
    };

    expect(convertor.cameras.getData(device)).toEqual({
      title:  'Gebied',
      hasOwner: false,
      props: [
        {
          key: 'Categorie',
          value: 'Camera toezichtsgebied',
          buttonAction: APP_ROUTES.CATEGORIES,
        },
        {
          key: 'Naam',
          value: device.properties?.display,
        },
      ],
    });
  });
});

