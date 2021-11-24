const layersFormatter = (layer, results) => {
  return layer.layers.map((l) => ({
    name: l.name,
    layer: {
      features: results.map((item) => l.transformer(item)),
    },
  }));
};

export default layersFormatter;
