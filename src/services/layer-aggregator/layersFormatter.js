const layersFormatter = (layer, result) => {
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

export default layersFormatter;
