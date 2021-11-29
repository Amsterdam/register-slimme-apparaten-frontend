import layersReader from './layersReader';

describe('getGeojsonLayers', () => {
  const featchServiceMock = async () => geojsonMock.features;
  const layersConfig = [
    {
      name: 'url-without-filter',
      url: `https://just-url/geojson`,
      fetchService: featchServiceMock,
      transformer: (item) => item,
    },
  ];

  const geojsonMock = {
    type: 'FeatureCollection',
    features: [
      {
        id: 1,
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [4.939927, 52.373982] },
        properties: { doel: ['123'] },
      },
      {
        id: 2,
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [4.934472, 52.374743] },
        properties: { doel: ['234'] },
      },
      {
        id: 3,
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [4.934472, 53.374743] },
        properties: { doel: ['345'], prop1: 'prop1-match', prop2: 'prop2-match' },
      },
    ],
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call all services from the configuration once', async () => {
    const layers = await layersReader(layersConfig);
    expect(layers).toBeTruthy();
    expect(layers.length).toEqual(1);
  });

  describe('should return the correct results', () => {
    it('should return all values for the url-without-filter', async () => {
      const layers = await layersReader(layersConfig);
      const { layer } = layers.find((l) => l.name === 'url-without-filter');
      expect(layer.features.length).toEqual(3);
    });
  });
});
