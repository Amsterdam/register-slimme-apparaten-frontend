import { useMemo } from 'react';
import { Sensor } from '../../../classes/Sensor';
import { SensorFilter } from '../../../classes/SensorFilter';
import { LegendCategories } from './../../../utils/types';

function useFilter(
  unFilteredResults: Sensor[],
  legend: Record<string, string[]>,
  selectedFilters: string[],
): SensorFilter {
  return useMemo(() => {
    if (!unFilteredResults || selectedFilters.length === 0 || !legend) {
      return new SensorFilter(unFilteredResults);
    }

    // Given the total list of posible options (legend[LegendCategories['Sensor type']]) filter only those items which are selected.
    const allowedSensorTypes = legend[LegendCategories['Sensor type']].filter((type) => selectedFilters.includes(type));

    // Do the same for themes
    const allowedThemes = legend[LegendCategories.Thema].filter((thema) => selectedFilters.includes(thema));

    const owner = legend[LegendCategories.Eigenaar].filter((type) => selectedFilters.includes(type));

    const pi = legend[LegendCategories['Verwerkt persoonsgegevens']].filter((type) => selectedFilters.includes(type));

    const filter = new SensorFilter(
      unFilteredResults,
      unFilteredResults,
      allowedSensorTypes,
      allowedThemes,
      owner,
      pi,
    ).filter();

    return filter;
  }, [unFilteredResults, legend, selectedFilters]);
}

export default useFilter;
