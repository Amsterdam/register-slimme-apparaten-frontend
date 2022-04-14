import { ThemeProvider } from '@amsterdam/asc-ui';
import { render, screen } from '@testing-library/react';
import { Feature, GeoJsonProperties, Point } from 'geojson';
import MapLegend from '.';
import { Sensor } from '../../classes/Sensor';
import { SensorFilter } from '../../classes/SensorFilter';
import sensors from '../../classes/__mockData__/sensors.json';

describe('MapLegend', () => {
  let sensorList: Sensor[] = [];
  beforeAll(() => {
    sensorList = sensors.map((s) => new Sensor(s.feature as Feature<Point, GeoJsonProperties>));
  });

  it('should show the right numbers in the legend', () => {
    const legend = {
      Sensortype: [
        'Positie- of verplaatsingsensor',
        'Optische / camera sensor',
        'Geluidsensor',
        'Aanwezigheid of nabijheidsensor',
      ],
      Eigenaar: ['Gemeente Amsterdam', 'Andere'],
      'Verwerkt persoonsgegevens': ['Nee', 'Ja'],
      Thema: [
        'Mobiliteit: railverkeer',
        'Mobiliteit: auto',
        'Mobiliteit: fiets',
        'Mobiliteit: voetganger',
        'Veiligheid: bewakings- en/of beveiligingscamera',
        'Veiligheid: gezondheid',
        'Overig',
        'Mobiliteit',
        'Milieu',
      ],
      'Vaste / mobiele sensoren': ['Vast', 'Mobiel'],
    };

    const filter = new SensorFilter(sensorList);

    render(
      <ThemeProvider>
        <MapLegend legend={legend} onToggleCategory={jest.fn()} filter={filter} selectedItems={[]} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Thema')).toBeInTheDocument();
    expect(screen.getByText('Verwerkt persoonsgegevens')).toBeInTheDocument();

    expect(screen.getByText('Positie- of verplaatsingsensor (1)')).toBeInTheDocument();

    expect(screen.getByText('Optische / camera sensor (6)')).toBeInTheDocument();
    expect(screen.getByText('Geluidsensor (1)')).toBeInTheDocument();
    expect(screen.getByText('Aanwezigheid of nabijheidsensor (0)')).toBeInTheDocument();

    expect(screen.getByText('Gemeente Amsterdam (1)')).toBeInTheDocument();
    expect(screen.getByText('Andere (7)')).toBeInTheDocument();

    expect(screen.getByText('Nee (7)')).toBeInTheDocument();
    expect(screen.getByText('Ja (1)')).toBeInTheDocument();

    expect(screen.getByText('Mobiliteit: railverkeer (1)')).toBeInTheDocument();
    expect(screen.getByText('Mobiliteit: auto (1)')).toBeInTheDocument();
    expect(screen.getByText('Veiligheid: bewakings- en/of beveiligingscamera (5)')).toBeInTheDocument();
  });
});
