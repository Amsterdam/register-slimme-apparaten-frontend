// import L from 'leaflet';
import { showDeviceInfo } from './useLayerManager';

// jest.mock('leaflet');

describe('useLayerManager', () => {
  describe('showDeviceInfo', () => {
    it('should highlight the active item', () => {
      const highlight = jest.fn();
      const onClick = jest.fn();
      const event = { target: 'test', sourceTarget:'sourceTarget' };
      const marker = { id: 'marker-id' };

      showDeviceInfo(event, marker, onClick, highlight);
      expect(highlight).toHaveBeenCalledWith(event.sourceTarget);
      expect(onClick).toHaveBeenCalledWith(marker);
    });
  });
});
