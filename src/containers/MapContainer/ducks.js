import { createSelector } from 'reselect';

// actions
export const SET_DEVICES = 'src/containers/MapContainer/SET_DEVICES';
export const SELECT_DEVICE = 'src/containers/MapContainer/SELECT_DEVICE';

// action creators
export function setDevicesActionCreator(devices) {
  return {
    type: SET_DEVICES,
    payload: devices,
  };
}

export function selectDeviceActionCreator(id) {
  return {
    type: SELECT_DEVICE,
    payload: id,
  };
}

// selectors
const selectMap = state => state.map;

export const makeSelectDevices = () => createSelector(selectMap, map => map.devices);

export const makeSelectedDevice = () =>
  createSelector(selectMap, map => map.devices.find(device => device.id === map.selectedDeviceId) || null);

// reducer
export const initialState = {
  devices: [],
  selectedDeviceId: 0,
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DEVICES:
      return { ...state, devices: [...state.devices, ...action.payload] };
    case SELECT_DEVICE:
      return { ...state, selectedDeviceId: action.payload };
    default:
      return state;
  }
}

export default mapReducer;
