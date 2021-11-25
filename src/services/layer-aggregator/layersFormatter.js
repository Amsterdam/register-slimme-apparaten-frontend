const layersFormatter = (layer, results) => {
  return {
    name: layer.name,
    layer: {
      features: (layer.filter ? results.filter(layer.filter) : results).map((item) => layer.transformer(item)),
    },
  };
};

export default layersFormatter;
