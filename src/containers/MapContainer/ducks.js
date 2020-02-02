import { createSelector } from 'reselect';

// actions
export const ADD_LAYER_DATA = 'src/containers/MapContainer/ADD_LAYER_DATA';
export const SELECT_LAYER_ITEM = 'src/containers/MapContainer/SELECT_LAYER_ITEM';

// action creators
export function addLayerDataActionCreator(name, layer) {
  return {
    type: ADD_LAYER_DATA,
    payload: { name, layer },
  };
}

export function selectLayerItemActionCreator(name, item) {
  return {
    type: SELECT_LAYER_ITEM,
    payload: { name, item },
  };
}

// selectors
const selectMap = state => state.map;

export const makeSelectLayers = () => createSelector(selectMap, map => map.layers);

export const makeSelectedLayer = () => createSelector(selectMap, map => map.selectedLayer);

export const makeSelectedItem = () =>
  createSelector(
    selectMap,
    ({ layers, selectedLayer, selectedItem }) =>
      (selectedLayer &&
        selectedItem &&
        layers[selectedLayer].features.find(item => item.id === selectedItem.id && item.contact === selectedItem.contact)) ||
      null,
  );

// reducer
export const initialState = {
  layers: {},
  selectedLayer: null,
  selectedItem: null,
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
      return {
        ...state,
        layers: {
          ...state.layers,
          [name]: {
            ...layer,
            features: [...newfeatures],
          },
        },
      };
    }
    case SELECT_LAYER_ITEM: {
      const { name, item } = action.payload;
      return { ...state, selectedLayer: name, selectedItem: item };
    }
    default:
      return state;
  }
}

export default mapReducer;
