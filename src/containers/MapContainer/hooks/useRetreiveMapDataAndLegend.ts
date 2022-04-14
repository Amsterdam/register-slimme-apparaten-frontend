import { MobileType } from './../../../utils/types';
import { useEffect, useState } from 'react';
import { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';

import layersReader from '../../../services/layer-aggregator/layersReader';
import LAYERS_CONFIG from '../../../services/layer-aggregator/layersConfig';
import { LegendCategories, OwnerType, SortedResults } from '../../../utils/types';
import { Sensor } from '../../../classes/Sensor';

export const emptyFeatureCollection = (): FeatureCollection => ({
  type: 'FeatureCollection',
  features: [],
});

function sortResultsIntoFilterCategories(sensors: Sensor[]): SortedResults {
  const sensorTypes = new Set<string>();
  sensors.forEach((s) => {
    sensorTypes.add(s.sensorType);
  });

  const ownerData = new Map<string, Set<string>>();
  sensors.forEach((s) => {
    if (s.isOwnedByMunicipality()) {
      if (ownerData.get(OwnerType.Gemeente) === undefined) {
        ownerData.set(OwnerType.Gemeente, new Set<string>());
      }

      s.projectsPaths?.forEach((path) =>
        path.filter((p) => p !== OwnerType.Gemeente).forEach((p) => ownerData.get(OwnerType.Gemeente)?.add(p)),
      );
    } else {
      ownerData.set(OwnerType.Other, new Set<string>());
    }
  });

  const owner: { [owner: string]: string[] } = {};
  ownerData.forEach((v, k) => {
    owner[k] = Array.from(v);
  });

  const piData = new Set<string>();
  sensors.forEach((s) => {
    if (s.isCollectingPiData()) {
      piData.add('Ja');
    } else {
      piData.add('Nee');
    }
  });

  const themes = new Set<string>();
  sensors.forEach((s) => {
    s.themes.forEach((t) => themes.add(t));
  });

  const mobile = new Set<string>();
  sensors.forEach((s) => {
    if (s.isMobileSensor()) {
      mobile.add(MobileType.Mobiel);
    } else {
      mobile.add(MobileType.Vast);
    }
  });

  // Sensor type
  // Eigenaar (Gemeente A'dam ja/nee)
  // Verwerkt persoonsgegevens
  // Thema
  // Mobiel

  return {
    [LegendCategories['Sensor type']]: Array.from(sensorTypes.values()),
    [LegendCategories.Eigenaar]: owner,
    [LegendCategories['Verwerkt persoonsgegevens']]: Array.from(piData.values()),
    [LegendCategories.Mobiel]: Array.from(mobile.values()),
    [LegendCategories.Thema]: Array.from(themes.values()),
  };
}

type MapDataAndLegend = {
  legend: SortedResults | null;
  sensors: Sensor[] | null;
};

function useRetrieveMapDataAndLegend(): MapDataAndLegend {
  const [results, setResults] = useState<MapDataAndLegend>({ legend: null, sensors: null });

  useEffect(() => {
    (async () => {
      const results = await layersReader(LAYERS_CONFIG);

      if (results === undefined) {
        return;
      }

      // Transform results into a feature collection.
      const featureCollection = emptyFeatureCollection();
      featureCollection.features = results
        .filter((r) => r.layer.features.length > 0)
        .map((r) => r.layer.features)
        .flat();

      // Convert feature collection to sensors.
      const sensors = featureCollection.features.map((f) => new Sensor(f as Feature<Point, GeoJsonProperties>));

      /**
       * Get all main categories and sub-categories based on acctual data.
       * {
       *    [category]: subCategories[]
       * }
       *
       */
      const legend = sortResultsIntoFilterCategories(sensors);

      setResults({ legend, sensors });
    })();
  }, []);

  return results;
}

export default useRetrieveMapDataAndLegend;
