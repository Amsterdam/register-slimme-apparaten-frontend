import { createSelector } from 'reselect';
import { categories } from '../../shared/configuration/categories';

// actions
export const ADD_LAYER_DATA = 'src/containers/MapContainer/ADD_LAYER_DATA';
export const REMOVE_LAYER_DATA = 'src/containers/MapContainer/REMOVE_LAYER_DATA';
export const SELECT_LAYER_ITEM = 'src/containers/MapContainer/SELECT_LAYER_ITEM';
export const TOGGLE_MAP_LAYER = 'src/containers/MapContainer/TOGGLE_MAP_LAYER';

// action creators
export function addLayerDataActionCreator(layers) {
  return {
    type: ADD_LAYER_DATA,
    payload: layers ,
  };
}

export function removeLayerDataActionCreator(names) {
  return {
    type: REMOVE_LAYER_DATA,
    payload: names,
  };
}

export function selectLayerItemActionCreator(name, item) {
  return {
    type: SELECT_LAYER_ITEM,
    payload: { name, item },
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

/** initializes the legend with all layers visible */
export const legend = Object.entries(categories).reduce(
  (acc, [key, category]) => (category.visible && category.enabled ? { ...acc, [key]: true } : { ...acc }),
  {},
);

// reducer
export const initialState = {
  layers: [],
  selectedLayer: null,
  selectedItem: null,
  legend,
};

function mapReducer(state = initialState, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case ADD_LAYER_DATA: {
      const result = {
        ...state,
        layers: [
          ...state.layers,
          ...action.payload,
        ],
      };
      return result;
    }
    case REMOVE_LAYER_DATA: {
      const names = action.payload;
      const result = {
        ...state,
        layers: [...state?.layers.filter(layer => !names.includes(layer.name))],
      };
      return result;
    }

    case SELECT_LAYER_ITEM: {
      const { name, item } = action.payload;
      return { ...state, selectedLayer: name, selectedItem: item };
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
