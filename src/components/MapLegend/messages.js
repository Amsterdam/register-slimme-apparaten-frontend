/*
 * Map Legend Messages
 *
 * This contains all the text for the MapLegend component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'IoTRegister.components.MapLegend';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Devices',
  },
  legendHide: {
    id: `${scope}.legend.hide`,
    defaultMessage: 'Map Legend, Hide Legend',
  },
  legendShow: {
    id: `${scope}.legend.show`,
    defaultMessage: 'Map Legend, Show Legend',
  },
  hide: {
    id: `${scope}.hide`,
    defaultMessage: 'Hide Legend',
  },
  show: {
    id: `${scope}.show`,
    defaultMessage: 'Show Legend',
  }
});
