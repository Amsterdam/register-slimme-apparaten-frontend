export const formatLayers = (layer, result) => {
  if (!layer.layers)
    return [
      {
        name: layer.name,
        layer: { ...result, features: result.features.map(item => layer.transformer(item)) },
        category: layer.category,
      },
    ];
  return layer.layers.map(l => ({
    name: l.name,
    layer: {
      ...result,
      features: (l.filter ? result.features.filter(item => l.filter(item)) : result.features).map(item =>
        l.transformer(item),
      ),
    },
    className: l.className,
    category: l.category,
  }));
};

/**
 *
 * Retrieves geojson data from different sources and filters the results
 * Returns a flatten layer array
 * @param {*} layersConfig - the layers configuration
 */
const getGeojsonLayers = async layersConfig => {
  const results = await Promise.all(
    layersConfig.map(async layer => {
      try {
        const data = await layer.fetchService(layer.url);
        const layers = formatLayers(layer, data);
        return layers;
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.error(`error in layer ${layer.name}`, ex);
        throw ex;
      }
    }),
  );
  return results.reduce((acc, item) => [...acc, ...item], []);
};

export default getGeojsonLayers;
