import { MemoryRouter } from 'react-router-dom';
import nock from 'nock';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@amsterdam/asc-ui';
import SensorenRegister from './containers/App/index';
import sensors from './classes/__mockData__/sensors.json';

jest.mock('./containers/MapContainer/PointClusterLayer', () => ({
  __esModule: true,
  default: () => <></>,
}));

jest.mock('./containers/HeaderContainer/index', () => {
  return {
    __esModule: true,
    default: () => <></>,
  };
});

const mockData = sensors.map((s) => s.feature.properties.originalData);

const emptyResponse = {
  features: [],
};

const TestRegister = () => {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <SensorenRegister />
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('SensorenRegister', () => {
  beforeEach(() => {
    nock('https://maps.amsterdam.nl')
      .get('/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS&THEMA=vis')
      .times(3)
      .reply(200, emptyResponse)
      .get('/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_BRUGSLUIS&THEMA=privacy')
      .reply(200, emptyResponse)
      .get('/open_geodata/geojson_lnglat.php?KAARTLAAG=CROWDSENSOREN&THEMA=cmsa')
      .times(2)
      .reply(200, emptyResponse)
      .get('/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_AISMASTEN&THEMA=privacy')
      .reply(200, emptyResponse)
      .get('/open_geodata/geojson_lnglat.php?KAARTLAAG=PRIVACY_OVERIG&THEMA=privacy')
      .reply(200, emptyResponse)
      .get('/open_geodata/geojson_lnglat.php?KAARTLAAG=VIS_BFA&THEMA=vis')
      .reply(200, emptyResponse);

    // https://acc.api.data.amsterdam.nl/iothings/devices/?page=1&page_size=1000
    nock('https://acc.api.data.amsterdam.nl')
      .get('/iothings/devices/?page=1&page_size=1000')
      .reply(200, {
        count: mockData.length,
        results: mockData,
        _links: {
          next: { href: null },
        },
      });
  });

  describe('Basics', () => {
    it('should render without errors', async () => {
      render(<TestRegister />);

      await screen.findByText('Sensortype');
      expect(screen.getByText('Eigenaar')).toBeInTheDocument();

      expect(screen.getByText('Gemeente Amsterdam (1)')).toBeInTheDocument();
      expect(screen.getByText('Andere (7)')).toBeInTheDocument();
      expect(screen.getByText('Veiligheid: bewakings- en/of beveiligingscamera (5)')).toBeInTheDocument();
    });

    it('should filter results when selecting a filter', async () => {
      render(<TestRegister />);

      await screen.findByText('Sensortype');

      expect(screen.getByText('Positie- of verplaatsingsensor (1)')).toBeInTheDocument();

      userEvent.click(screen.getByText('Gemeente Amsterdam (1)'));

      await screen.findByText('Positie- of verplaatsingsensor (0)');
    });
  });
});
