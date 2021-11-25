import { useEffect, useState } from 'react';
import { FeatureCollection } from 'geojson';

import layersReader from 'services/layer-aggregator/layersReader';
import LAYERS_CONFIG from 'services/layer-aggregator/layersConfig';
import { IntermediateLayer, LegendCategories, OwnerType, SortedResults } from 'utils/types';

export const emptyFeatureCollection = (): FeatureCollection => ({
  type: 'FeatureCollection',
  features: [],
});

const addItemToFeatureCollection = (categoryKey: string, map: Record<string, FeatureCollection | null>, item: any) => {
  let keys: string | string[] = categoryKey;
  if (!Array.isArray(keys)) {
    keys = [categoryKey];
  }

  keys.forEach((key) => {
    if (map[key]) {
      map[key]?.features.push(item);
    } else {
      map[key] = emptyFeatureCollection();
      map[key]?.features.push(item);
    }
  });

  return map;
};

function sortResultsIntoFilterCategories(results: IntermediateLayer[]): SortedResults {
  type AccumulatorType = { [key: string]: FeatureCollection | null };

  const allFeatures = results
    .filter((r) => r.layer.features.length > 0)
    .map((r) => r.layer.features)
    .flat();

  const sensorTypes = allFeatures.reduce((acc: AccumulatorType, curr) => {
    return addItemToFeatureCollection(curr.properties?.sensorType, acc, curr);
  }, {});

  const owner = allFeatures.reduce((acc: AccumulatorType, curr) => {
    if (curr.properties?.organisation === OwnerType.Gemeente) {
      acc = addItemToFeatureCollection(OwnerType.Gemeente, acc, curr);
    } else {
      acc = addItemToFeatureCollection(OwnerType.Other, acc, curr);
    }

    return acc;
  }, {});

  const piData = allFeatures.reduce((acc: AccumulatorType, curr) => {
    const ja = 'Ja';
    const nee = 'Nee';

    if (curr.properties?.containsPiData) {
      acc = addItemToFeatureCollection(ja, acc, curr);
    } else {
      acc = addItemToFeatureCollection(nee, acc, curr);
    }

    return acc;
  }, {});

  const themes = allFeatures.reduce((acc: AccumulatorType, curr) => {
    return addItemToFeatureCollection(curr.properties?.themes, acc, curr);
  }, {});

  // Sensor type
  // Eigenaar (Gemeente A'dam ja/nee)
  // Verwerkt persoonsgegevens
  // Thema

  return {
    [LegendCategories['Sensor type']]: sensorTypes,
    [LegendCategories.Eigenaar]: owner,
    [LegendCategories['Verwerkt persoonsgegevens']]: piData,
    [LegendCategories.Thema]: themes,
  };
}

type MapDataAndLegend = {
  legend: Record<string, string[]> | null;
  featureCollection: FeatureCollection | null;
};

function useRetrieveMapDataAndLegend(): MapDataAndLegend {
  const [results, setResults] = useState<MapDataAndLegend>({ legend: null, featureCollection: null });

  useEffect(() => {
    (async () => {
      const results = await layersReader(LAYERS_CONFIG);

      const sortedResults = sortResultsIntoFilterCategories(results);

      /**
       * Get all main categories and sub-categories based on acctual data.
       * {
       *    [category]: subCategories[]
       * }
       *
       */
      const legend = Object.keys(sortedResults).reduce((acc, key) => {
        return {
          ...acc,
          [key]: Object.keys(sortedResults[key]),
        };
      }, {});

      /**
       * Get an object with shape
       * {
       *    [subCategory]: FeatureCollection
       * }
       *
       */

      const featureCollection = emptyFeatureCollection();
      featureCollection.features = results
        .filter((r) => r.layer.features.length > 0)
        .map((r) => r.layer.features)
        .flat();

      setResults({ legend, featureCollection });
    })();
  }, []);

  return results;
}

export default useRetrieveMapDataAndLegend;
