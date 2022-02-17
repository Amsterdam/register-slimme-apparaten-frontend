import { useMemo } from 'react';
import { LegendCategories, Sensor, SensorFilter } from './../../../utils/types';

function useFilter(unFilteredResults: Sensor[], legend: Record<string, string[]>, selectedFilters: string[]): Sensor[] {
  return useMemo(() => {
    if (!unFilteredResults) {
      return unFilteredResults;
    }

    if (selectedFilters.length === 0 || !legend) {
      return unFilteredResults;
    }

    // Given the total list of posible options (legend[LegendCategories['Sensor type']]) filter only those items which are selected.
    const allowedSensorTypes = legend[LegendCategories['Sensor type']].filter((type) => selectedFilters.includes(type));

    // Do the same for themes
    const allowedThemes = legend[LegendCategories.Thema].filter((thema) => selectedFilters.includes(thema));

    const owner = legend[LegendCategories.Eigenaar].filter((type) => selectedFilters.includes(type));

    const pi = legend[LegendCategories['Verwerkt persoonsgegevens']].filter((type) => selectedFilters.includes(type));

    const filter = new SensorFilter(unFilteredResults, [], allowedSensorTypes, allowedThemes, owner, pi).filter();

    // const typeCounter = new SensorFilter(unFilteredResults, allowedSensorTypes, allowedThemes, owner, pi)
    //   .filterOwner()
    //   .filterPi()
    //   .filterTheme()
    //   .countOtherSensorTypes();

    // otherTypes.forEach((t) => {
    //   console.log(`${t}: (${typeCounter.sensors.filter((s) => s.isSensorType(t)).length})`);
    // });

    return filter.sensors;
  }, [unFilteredResults, legend, selectedFilters]);
}

export default useFilter;
