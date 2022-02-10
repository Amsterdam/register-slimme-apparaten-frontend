import { useMemo } from 'react';
import { Feature, FeatureCollection } from 'geojson';

import { LegendCategories, OwnerType, PiOptions } from '../../../utils/types';
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

    // Given the total list of posible options (legend[LegendCategories['Sensor type']]) filter only those items which are selected.
    const allowedSensorTypes = legend[LegendCategories['Sensor type']].filter((type) => selectedFilters.includes(type));

    // Do the same for themes
    const allowedThemes = legend[LegendCategories.Thema].filter((thema) => selectedFilters.includes(thema));

    const owner = legend[LegendCategories.Eigenaar].filter((type) => selectedFilters.includes(type));

    const pi = legend[LegendCategories['Verwerkt persoonsgegevens']].filter((type) => selectedFilters.includes(type));

    filterdFeatureCollection.features = unFilteredResults?.features.filter((f) => {
      return (
        sensoreTypeFilter(f, allowedSensorTypes) &&
        ownerFilter(f, owner) &&
        piFilter(f, pi) &&
        themeFilter(f, allowedThemes)
      );
    });

    return filterdFeatureCollection;
  }, [unFilteredResults, legend, selectedFilters]);
}

const sensoreTypeFilter = (feature: Feature, typeFilter: string[]) => {
  if (typeFilter.length === 0) {
    return true;
  }

  return typeFilter.includes(feature.properties?.sensorType);
};

const themeFilter = (feature: Feature, themeFilter: string[]) => {
  if (themeFilter.length === 0) {
    return true;
  }

  return feature.properties?.themes.some((theme: string) => themeFilter.includes(theme));
};

const ownerFilter = (feature: Feature, ownerFilter: string[]) => {
  if (ownerFilter.length === 2) {
    return true;
  }

  if (ownerFilter.length === 0) {
    return true;
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
    return true;
  }

  return (
    (piFilter[0] === PiOptions.Ja && feature.properties?.containsPiData === true) ||
    (piFilter[0] === PiOptions.Nee && feature.properties?.containsPiData === false)
  );
};

export default useFilter;
