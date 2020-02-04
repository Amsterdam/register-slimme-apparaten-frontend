import { createSelector } from 'reselect';

// actions
export const ADD_LAYER_DATA = 'src/containers/MapContainer/ADD_LAYER_DATA';
export const REMOVE_LAYER_DATA = 'src/containers/MapContainer/REMOVE_LAYER_DATA';
export const SELECT_LAYER_ITEM = 'src/containers/MapContainer/SELECT_LAYER_ITEM';

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
        layers[selectedLayer].features.find(
          item => item.id === selectedItem.id && item.contact === selectedItem.contact,
        )) ||
      null,
  );

// reducer
export const initialState = {
  layers: {},
  selectedLayer: null,
  selectedItem: null,
};

function mapReducer(state = initialState, action) {
  console.log(action.type, action.payload);
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
      console.log('add', result.layers.cameras && result.layers.cameras.features.length);
      console.log('add', result.layers.devices && result.layers.devices.features.length);
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
        selectedLayer: null,
        selectedItem: null,
      };
      console.log('remove', result.layers.cameras && result.layers.cameras.features.length);
      console.log('remove', result.layers.devices && result.layers.devices.features.length);

      return result;
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
