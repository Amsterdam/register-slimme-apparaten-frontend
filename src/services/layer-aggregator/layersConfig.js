import { filter } from 'lodash';
import CONFIGURATION from '../../shared/environment';
import { mapSensorTypeToColor } from '../../utils/types';
import { readPaginatedData } from '../datareader';

const LAYERS_CONFIG = [
  {
    name: 'Sensornet',
    url: `${CONFIGURATION.API_ROOT}iothings/devices/`,
    fetchService: readPaginatedData,
    transformer: (item) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.location.longitude, item.location.latitude], // See also: https://datatracker.ietf.org/doc/html/rfc7946#section-3.1
      },
      properties: {
        privacy: item?.observation_goals
          ?.filter((i) => i.privacy_declaration !== null)
          ?.map((g) => g.privacy_declaration),
        contact: item.owner,
        color: mapSensorTypeToColor[item.type] || '#000000',
        containsPiData: item.contains_pi_data,
        organisation: item.owner.organisation,
        sensorType: item.type,
        themes: item.themes,
        longitude: item.location.longitude,
        latitude: item.location.latitude,
        activeUntil: flipDate(item.active_until),
        goal: item?.observation_goals?.filter((i) => i.observation_goal !== null)?.map((g) => g.observation_goal),
        legalGround: item?.observation_goals?.filter((i) => i.legal_ground !== null)?.map((g) => g.legal_ground),
        originalData: item,
        reference: item?.reference,
        region: item?.region,
        projectPaths: item?.project_paths,
      },
    }),
  },
];

const flipDate = (date) => {
  const arr = date?.split('-');

  if (arr.length < 3) {
    return date;
  }

  return `${arr[2]}-${arr[1]}-${arr[0]}`;
};

export default LAYERS_CONFIG;
