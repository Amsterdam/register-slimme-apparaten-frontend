import { IntermediateLayer } from '../../utils/types';
import layersFormatter from './layersFormatter';

/**
 *
 * Retrieves geojson data from different sources and filters the results
 * Returns a flatten layer array
 * @param {*} layersConfig - the layers configuration
 */
const layersReader: (layersConfig: any[]) => Promise<IntermediateLayer[] | undefined> = async (layersConfig) => {
  const results = (await Promise.all(
    layersConfig.map(async (layer) => {
      try {
        const data = await layer.fetchService(layer.url);

        const layers = layersFormatter(layer, data);

        return layers;
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.error(`error in layer ${layer.name}`, ex);
      }
    }),
  )) as IntermediateLayer[];

  return results.filter(Boolean).flat();
};

export default layersReader;
