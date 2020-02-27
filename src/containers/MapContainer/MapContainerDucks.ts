import { categories } from '../../shared/configuration/categories';
import { ActionType } from '../../utils/types';

// actions
export const ADD_LAYER_DATA = 'src/containers/MapContainer/ADD_LAYER_DATA';
export const REMOVE_LAYER_DATA = 'src/containers/MapContainer/REMOVE_LAYER_DATA';
export const SELECT_LAYER_ITEM = 'src/containers/MapContainer/SELECT_LAYER_ITEM';
export const TOGGLE_MAP_LAYER = 'src/containers/MapContainer/TOGGLE_MAP_LAYER';

// action creators
export function addLayerDataActionCreator(layers: any[]) {
  return {
    type: ADD_LAYER_DATA,
    payload: layers,
  };
}

export function removeLayerDataActionCreator(names: string[]) {
  return {
    type: REMOVE_LAYER_DATA,
    payload: names,
  };
}

export function selectLayerItemActionCreator(name?: string, item?: any) {
  return {
    type: SELECT_LAYER_ITEM,
    payload: { name, item },
  };
}

export function toggleMapLayerActionCreator(name: string) {
  return {
    type: TOGGLE_MAP_LAYER,
    payload: name,
  };
}

/** initializes the legend with all layers visible */
export const legend = Object.entries(categories).reduce(
  (acc, [key, category]) => (category.visible && category.enabled ? { ...acc, [key]: true } : { ...acc }),
  {},
);

export interface MapState {
  layers: Array<any>;
  selectedLayer: any;
  selectedItem: any;
  legend: any;
}

// reducer
export const initialState: MapState = {
  layers: [],
  selectedLayer: null,
  selectedItem: null,
  legend,
};


function mapReducer(state = initialState, action: ActionType<any>) {
  switch (action.type) {
    case ADD_LAYER_DATA: {
      const result = {
        ...state,
        layers: [...state.layers, ...action.payload],
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
