import APP_ROUTES from 'services/appRoutes';

// interface DeviceDataItem {
//   name: string,
//   value: string | React.FC,
// }

// interface DeviceData {
//   title: string,
//   props: DeviceDataItem[],
//   hasOwner: boolean,
//   hasHelp: boolean,
// }

const convertor = {
  'devices': {
    getData: device => {
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
    getData: device => {
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


