import { showInfo } from './useLayerManager';

describe('useLayerManager', () => {
  describe('showInfo', () => {
    it('should highlight the active item', () => {
      const highlight = jest.fn();
      const onClick = jest.fn();
      const element = { id: 'leaflet-id' };
      const item = { id: 'marker-id' };

      showInfo(element, item, onClick, highlight);
      expect(highlight).toHaveBeenCalledWith(element);
      expect(onClick).toHaveBeenCalledWith(item);
    });
  });
});
