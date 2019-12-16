export const formatLayers = (layer, result) => {
  if (!layer.layers) return [{ name: layer.name, layer: result, style: layer.style }];
  return layer.layers.map(l => ({
    name: l.name,
    layer: {
      ...result,
      features: l.filter ? result.features.filter(item => l.filter(item)) : result.features,
    },
    className: l.className,
    style: l.style,
  }));
};

/**
 *
 * @param {*} layersConfig - the layers configuration
 * Retrieves geojson data from different sources and filters the results
 * Returns a flatten layer array
 */
const getGeojsonLayers = async layersConfig => {
  const results = await Promise.all(
    layersConfig.map(async layer => {
      try {
        const result = await fetch(layer.url);
        const data = await result.json();
        const layers = formatLayers(layer, data);
        return layers;
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.log(`error in layer ${layer.name}`, ex);
        throw ex;
      }
    }),
  );
  return results.reduce((acc, item) => [...acc, ...item], []);
};

export default getGeojsonLayers;
