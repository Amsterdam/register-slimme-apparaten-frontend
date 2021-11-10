import { categories } from '../../shared/configuration/categories';
import { ActionType, LayerType, ItemType, Item } from '../../utils/types';

// actions
export const ADD_LAYER_DATA = 'src/containers/MapContainer/ADD_LAYER_DATA';
export const REMOVE_LAYER_DATA = 'src/containers/MapContainer/REMOVE_LAYER_DATA';
export const SELECT_LAYER_ITEM = 'src/containers/MapContainer/SELECT_LAYER_ITEM';
export const TOGGLE_MAP_LAYER = 'src/containers/MapContainer/TOGGLE_MAP_LAYER';

// action creators
export const addLayerDataActionCreator = (layers: LayerType[]): ActionType => {
  return {
    type: ADD_LAYER_DATA,
    payload: layers,
  };
};

export const removeLayerDataActionCreator = (names: string[]): ActionType => {
  return {
    type: REMOVE_LAYER_DATA,
    payload: names,
  };
};

export const selectLayerItemActionCreator = (name?: string, item?: Item): ActionType => {
  return {
    type: SELECT_LAYER_ITEM,
    // @ts-ignore
    payload: { name, item },
  };
};

export const toggleMapLayerActionCreator = (name: string): ActionType => {
  return {
    type: TOGGLE_MAP_LAYER,
    payload: name,
  };
};

/** initializes the legend with all layers visible */
export const legend = Object.entries(categories).reduce(
  (acc, [key, category]) => (category.visible && category.enabled ? { ...acc, [key]: true } : { ...acc }),
  {},
);

export interface MapState {
  layers: LayerType[];
  selectedLayer: string | null;
  selectedItem: ItemType | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: any;
}

// reducer
export const initialState: MapState = {
  layers: [],
  selectedLayer: 'legend',
  selectedItem: null,
  legend,
};

function mapReducer(state = initialState, action: ActionType): MapState {
  switch (action.type) {
    case ADD_LAYER_DATA: {
      const result = {
        ...state,
        // @ts-ignore
        layers: [...state.layers, ...action.payload],
      };
      return result;
    }
    case REMOVE_LAYER_DATA: {
      const names = action.payload;
      const result = {
        ...state,
        // @ts-ignore
        layers: [...state?.layers.filter((layer) => !names.includes(layer.name))],
      };
      return result;
    }

    case SELECT_LAYER_ITEM: {
      // @ts-ignore
      const { name, item } = action.payload;
      return { ...state, selectedLayer: name, selectedItem: item };
    }

    case TOGGLE_MAP_LAYER: {
      const name = action.payload;
      return {
        ...state,
        legend: {
          ...state.legend,
          // @ts-ignore
          [name]: !state.legend[name],
        },
      };
    }

    default:
      return state;
  }
}

export default mapReducer;
