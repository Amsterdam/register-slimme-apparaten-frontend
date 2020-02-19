import { createSelector } from 'reselect';
import { categories } from '../../shared/configuration/categories';

// actions
export const ADD_LAYER_DATA = 'src/containers/MapContainer/ADD_LAYER_DATA';
export const REMOVE_LAYER_DATA = 'src/containers/MapContainer/REMOVE_LAYER_DATA';
export const SELECT_LAYER_ITEM = 'src/containers/MapContainer/SELECT_LAYER_ITEM';
export const ADD_MAP_LAYER = 'src/containers/MapContainer/ADD_MAP_LAYER';
export const REMOVE_MAP_LAYER = 'src/containers/MapContainer/REMOVE_MAP_LAYER';
export const TOGGLE_MAP_LAYER = 'src/containers/MapContainer/TOGGLE_MAP_LAYER';

// action creators
export function addLayerDataActionCreator(name, layer) {
  return {
    type: ADD_LAYER_DATA,
    payload: { name, layer },
  };
}

export function removeLayerDataActionCreator(name) {
  return {
    type: REMOVE_LAYER_DATA,
    payload: name,
  };
}

export function selectLayerItemActionCreator(name, item) {
  return {
    type: SELECT_LAYER_ITEM,
    payload: { name, item },
  };
}

export function addMapLayerActionCreator(name, layer) {
  return {
    type: ADD_MAP_LAYER,
    payload: { name, layer },
  };
}

export function removeMapLayerActionCreator(name) {
  return {
    type: REMOVE_MAP_LAYER,
    payload: name,
  };
}

export function toggleMapLayerActionCreator(name) {
  return {
    type: TOGGLE_MAP_LAYER,
    payload: name,
  };
}

// selectors
const selectMap = state => state.map;

export const makeSelectLayers = () => createSelector(selectMap, map => map.layers);

export const makeSelectedLayer = () => createSelector(selectMap, map => map.selectedLayer);

export const makeSelectedItem = () => createSelector(selectMap, ({ selectedItem }) => selectedItem || null);

export const legend = Object.entries(categories).reduce(
  (acc, [key, category]) => (category.visible && category.enabled ? { ...acc, [key]: true } : { ...acc }),
  {},
);


// reducer
export const initialState = {
  layers: {},
  selectedLayer: null,
  selectedItem: null,
  mapLayers: {},
  legend,
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LAYER_DATA: {
      const {
        name,
        layer: { features },
        layer,
      } = action.payload;
      const newfeatures =
        state.layers[name] && state.layers[name].features
          ? [...state.layers[name].features, ...features]
          : [...features];
      const result = {
        ...state,
        layers: {
          ...state.layers,
          [name]: {
            ...layer,
            features: [...newfeatures],
          },
        },
      };
      return result;
    }
    case REMOVE_LAYER_DATA: {
      const name = action.payload;
      const result = {
        ...state,
        layers: {
          ...state.layers,
          [name]: {
            ...state.layers[name],
            features: [],
          },
        },
      };
      return result;
    }

    case SELECT_LAYER_ITEM: {
      const { name, item } = action.payload;
      return { ...state, selectedLayer: name, selectedItem: item };
    }

    case ADD_MAP_LAYER: {
      const { name, layer } = action.payload;
      return {
        ...state,
        mapLayers: {
          ...state.mapLayers,
          [name]: layer,
        },
      };
    }

    case REMOVE_MAP_LAYER: {
      const { name } = action.payload;
      return {
        ...state,
        mapLayers: {
          ...state.mapLayers,
          [name]: null,
        },
      };
    }

    case TOGGLE_MAP_LAYER: {
      const name = action.payload;
      return {
        ...state,
        legend: {
          ...state.legend,
          [name]: !state.legend[name],
        },
      };
    }

    default:
      return state;
  }
}

export default mapReducer;
