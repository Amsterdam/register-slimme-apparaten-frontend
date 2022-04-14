import { useMemo } from 'react';
import { Sensor } from '../../../classes/Sensor';
import { SensorFilter } from '../../../classes/SensorFilter';
import { LegendCategories, SortedResults } from './../../../utils/types';

function useFilter(unFilteredResults: Sensor[], legend: SortedResults | null, selectedFilters: string[]): SensorFilter {
  return useMemo(() => {
    if (!unFilteredResults || selectedFilters.length === 0 || !legend) {
      console.log(new SensorFilter(unFilteredResults));
      return new SensorFilter(unFilteredResults);
    }

    // Given the total list of posible options (legend[LegendCategories['Sensor type']]) filter only those items which are selected.
    const sensorTypes = legend[LegendCategories['Sensor type']];
    const allowedSensorTypes = Array.isArray(sensorTypes)
      ? sensorTypes.filter((type) => selectedFilters.includes(type))
      : [];

    // Do the same for themes
    const themes = legend[LegendCategories.Thema];
    const allowedThemes = Array.isArray(themes) ? themes.filter((thema) => selectedFilters.includes(thema)) : [];

    const owner = legend[LegendCategories.Eigenaar] as { [key: string]: string[] };
    const ownerFilter = Object.keys(owner).filter((owner) => selectedFilters.includes(owner));

    // Projects are a special case
    const projectFilter = Object.keys(owner)
      .map((k) => owner[k].filter((project) => selectedFilters.includes(project)))
      .flat();

    const pi = legend[LegendCategories['Verwerkt persoonsgegevens']];
    const piFilter = Array.isArray(pi) ? pi.filter((type) => selectedFilters.includes(type)) : [];

    const mobile = legend[LegendCategories.Mobiel];
    const mobileFilter = Array.isArray(mobile) ? mobile.filter((type) => selectedFilters.includes(type)) : [];

    const filter = new SensorFilter(
      unFilteredResults,
      unFilteredResults,
      allowedSensorTypes,
      allowedThemes,
      ownerFilter,
      piFilter,
      mobileFilter,
      projectFilter,
    ).filter();

    console.log(filter);

    return filter;
  }, [unFilteredResults, legend, selectedFilters]);
}

export default useFilter;
