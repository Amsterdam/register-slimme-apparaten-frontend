import APP_ROUTES from 'services/appRoutes';

import { Device, DeviceDataItem } from '../..';

interface DeviceData {
  title: string;
  props: DeviceDataItem[];
  hasOwner: boolean;
}

const convertor = {
  'devices': {
    getData: (device: Device): DeviceData => {
      const {
        soort,
        category,
        organisation,
        privacy,
      } = device || {};

      return {
        title: 'Apparaat',
        props: [
          {
            key: 'Categorie',
            value: category,
            buttonAction: APP_ROUTES.CATEGORIES,
          },
          {
            key: 'Type',
            value: soort,
          },
          {
            key: 'Organisatie',
            value: organisation,
          },
          {
            key: 'Privacyverklaring',
            value: privacy,
            isLink: true,
          },
        ],
        hasOwner: true,
      }
    },
  },
  'cameras': {
    getData: (device: Device): DeviceData => {
      const {
        properties,
      } = device || {};
      const { display } = properties || {};

      return {
        title: 'Gebied',
        props: [
          {
            key: 'Categorie',
            value: 'Camera toezichtsgebied',
            buttonAction: APP_ROUTES.CATEGORIES,
          },
          {
            key: 'Naam',
            value: display,
          },
        ],
        hasOwner: false,
      }
    },
  },
}

export default convertor;


