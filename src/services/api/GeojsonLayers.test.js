import getGeojsonLayers from './GeojsonLayers';

describe('getGeojsonLayers', () => {
  const layersConfig = [
    {
      name: 'url-without-filter',
      url: `https://just-url/geojson`,
    },
    {
      name: 'url-with-many-filters',
      url: 'https://url-with-many-filters',
      layers: [
        {
          name: 'url-with-filter-1',
          filter: item => item.properties.doel.find(d => d.startsWith('1')),
        },
        {
          name: 'url-with-filter-2',
          filter: item => item.properties.doel.find(d => d.startsWith('2')),
        },
      ],
    },
    {
      name: 'url-with-one-filter',
      url: 'https://url-with-one-filter',
      layers: [
        {
          name: 'url-with-one-filter-1',
          filter: item => item.properties.prop1 === 'prop1-match' && item.properties.prop2 === 'prop2-match',
        },
      ],
    },
  ];

  beforeEach(() => {
    // fetch.resetMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call all services from the configuration once', async () => {
    const geojsonMock = {
      type: "FeatureCollection",
      features: [
        {
          "id": 1, "type": "Feature", "geometry": { "type": "Point", "coordinates": [4.939927, 52.373982] },
          "properties": { doel: ['123'] },
        },
        {
          "id": 2, "type": "Feature", "geometry": { "type": "Point", "coordinates": [4.934472, 52.374743] },
          "properties": { doel: ['234'] },
        },
        {
          "id": 3, "type": "Feature", "geometry": { "type": "Point", "coordinates": [4.934472, 53.374743] },
          "properties": { doel: ['345'], prop1: 'prop1-match', prop2: 'prop2-match' },
        },
      ],
    };

    window.fetch.mockResponse(       JSON.stringify(geojsonMock)  ); 
    const layers = await getGeojsonLayers(layersConfig);
    expect(layers).toBeTruthy();
    expect(layers.length).toEqual(3);
  });
});
