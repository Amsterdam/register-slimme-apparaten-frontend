import { HIGHLIGHT_CLASS, removeCurrentHighlight, showAreas } from './iotmap';

jest.mock('leaflet');
import L from 'leaflet'; // eslint-disable-line import/first

describe('iotmap', () => {
  describe('the map camera areas layer', () => {
    let layer;

    beforeEach(() => {
      layer = { on: jest.fn() };
      L.Proj = { geoJson: jest.fn(() => layer) };
    });

    it('should load the geojson into the map', () => {
      const onClick = jest.fn();
      const geojson = { foo: 'bar' };
      const map = { addLayer: jest.fn() };

      showAreas(map, geojson, onClick);

      expect(L.Proj.geoJson).toHaveBeenCalledWith(geojson, { className: 'camera-area' });
      expect(layer.on).toHaveBeenCalled();
      expect(map.addLayer).toHaveBeenCalledWith(layer);
    });

    it('should highlight area on click', () => {
      const onClick = jest.fn();
      const geojson = { foo: 'bar' };
      const map = { addLayer: jest.fn() };

      const classList = { add: jest.fn() };
      const clickEvent = {
        sourceTarget: { feature: 'foo' },
        layer: { getElement: () => ({ classList }) }
      };

      showAreas(map, geojson, onClick);
      const layerOnClick = layer.on.mock.calls[0][1];
      layerOnClick(clickEvent);

      expect(classList.add).toHaveBeenCalledWith(HIGHLIGHT_CLASS);
      expect(onClick).toHaveBeenCalledWith(clickEvent.sourceTarget.feature);
    });


    it('should remove the area highlight when requested', () => {
      const onClick = jest.fn();
      const geojson = { foo: 'bar' };
      const map = { addLayer: jest.fn() };

      const classList = { add: jest.fn(), remove: jest.fn() };
      const clickEvent = {
        sourceTarget: { feature: 'foo' },
        layer: { getElement: () => ({ classList }) }
      };

      showAreas(map, geojson, onClick);
      const layerOnClick = layer.on.mock.calls[0][1];
      layerOnClick(clickEvent);
      removeCurrentHighlight(map);

      expect(classList.remove).toHaveBeenCalledWith(HIGHLIGHT_CLASS);
    });
  });
});
