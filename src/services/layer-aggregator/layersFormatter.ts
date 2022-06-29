import { IntermediateLayer } from '../../utils/types';

const layersFormatter = (
  layer: { name: string; filter?: () => boolean; transformer: (item: any) => any },
  results: any[],
): IntermediateLayer => {
  return {
    name: layer.name,
    layer: {
      features: (layer.filter ? results.filter(layer.filter) : results)
        ?.map((item) => layer.transformer(item))
        ?.filter(Boolean),
    },
  };
};

export default layersFormatter;
