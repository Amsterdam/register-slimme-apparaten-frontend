import { useMemo } from 'react';
import { Feature, FeatureCollection } from 'geojson';

import { LegendCategories, OwnerType, PiOptions } from 'utils/types';
import { emptyFeatureCollection } from './useRetreiveMapDataAndLegend';

function useFilter(
  unFilteredResults: FeatureCollection,
  legend: Record<string, string[]>,
  selectedFilters: string[],
): FeatureCollection {
  return useMemo(() => {
    if (!unFilteredResults?.features) {
      return unFilteredResults;
    }

    if (selectedFilters.length === 0 || !legend) {
      return unFilteredResults;
    }

    const filterdFeatureCollection = emptyFeatureCollection();

    filterdFeatureCollection.features = unFilteredResults?.features.filter((f) => {
      const allowedSensorTypes = legend[LegendCategories['Sensor type']].filter((type) =>
        selectedFilters.includes(type),
      );

      const owner = legend[LegendCategories.Eigenaar].filter((type) => selectedFilters.includes(type));

      const pi = legend[LegendCategories['Verwerkt persoonsgegevens']].filter((type) => selectedFilters.includes(type));

      return allowedSensorTypes.includes(f.properties?.sensorType) && ownerFilter(f, owner) && piFilter(f, pi);
    });

    return filterdFeatureCollection;
  }, [unFilteredResults, legend, selectedFilters]);
}

const ownerFilter = (feature: Feature, ownerFilter: string[]) => {
  if (ownerFilter.length === 2) {
    return true;
  }

  if (ownerFilter.length === 0) {
    return false;
  }

  return (
    (ownerFilter[0] === OwnerType.Gemeente && feature.properties?.organisation === OwnerType.Gemeente) ||
    (ownerFilter[0] === OwnerType.Other && feature.properties?.organisation !== OwnerType.Gemeente)
  );
};

const piFilter = (feature: Feature, piFilter: string[]) => {
  if (piFilter.length === 2) {
    return true;
  }

  if (piFilter.length === 0) {
    return false;
  }

  return (
    (piFilter[0] === PiOptions.Ja && feature.properties?.containsPiData === true) ||
    (piFilter[0] === PiOptions.Nee && feature.properties?.containsPiData === false)
  );
};

export default useFilter;
