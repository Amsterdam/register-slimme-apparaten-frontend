import { MobileType } from './../../../utils/types';
import { useEffect, useState } from 'react';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';

import layersReader from '../../../services/layer-aggregator/layersReader';
import LAYERS_CONFIG from '../../../services/layer-aggregator/layersConfig';
import { IntermediateLayer, LegendCategories, OwnerType, SortedResults } from '../../../utils/types';
import { Sensor } from '../../../classes/Sensor';

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

  const mobile = allFeatures.reduce((acc: AccumulatorType, curr) => {
    if (curr.properties?.region?.length > 0) {
      acc = addItemToFeatureCollection(MobileType.Mobiel, acc, curr);
    } else {
      acc = addItemToFeatureCollection(MobileType.Vast, acc, curr);
    }

    return acc;
  }, {});

  // Sensor type
  // Eigenaar (Gemeente A'dam ja/nee)
  // Verwerkt persoonsgegevens
  // Thema
  // Mobiel

  return {
    [LegendCategories['Sensor type']]: sensorTypes,
    [LegendCategories.Eigenaar]: owner,
    [LegendCategories['Verwerkt persoonsgegevens']]: piData,
    [LegendCategories.Mobiel]: mobile,
    [LegendCategories.Thema]: themes,
  };
}

type MapDataAndLegend = {
  legend: Record<string, string[]> | null;
  featureCollection: FeatureCollection | null;
  sensors: Sensor[] | null;
};

function useRetrieveMapDataAndLegend(): MapDataAndLegend {
  const [results, setResults] = useState<MapDataAndLegend>({ legend: null, featureCollection: null, sensors: null });

  useEffect(() => {
    (async () => {
      const results = await layersReader(LAYERS_CONFIG);

      if (results === undefined) {
        return;
      }

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

      // Transform results into a feature collection.
      const featureCollection = emptyFeatureCollection();
      featureCollection.features = results
        .filter((r) => r.layer.features.length > 0)
        .map((r) => r.layer.features)
        .flat();

      const sensors = featureCollection.features.map((f) => new Sensor(f as Feature<Point, GeoJsonProperties>));

      setResults({ legend, featureCollection, sensors });
    })();
  }, []);

  return results;
}

export default useRetrieveMapDataAndLegend;
