import APP_ROUTES from 'services/appRoutes';
import { Device } from '../..';

interface DeviceDataItem {
  key: string;
  value?: string;
  buttonAction?: string;
  isLink?: boolean;
}

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
        properties,
      } = device || {};
      const { Privacyverklaring } = properties || {};
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
            value: Privacyverklaring,
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
            key: 'category',
            value: 'Camera toezichtsgebied',
            buttonAction: APP_ROUTES.CATEGORIES,
          },
          {
            key: 'name',
            value: display,
          },
        ],
        hasOwner: false,
      }
    },
  },
}

export default convertor;


