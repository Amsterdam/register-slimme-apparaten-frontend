import { SHOW_GLOBAL_ERROR, RESET_GLOBAL_ERROR } from './constants';

export function showGlobalError(message) {
  return {
    type: SHOW_GLOBAL_ERROR,
    payload: message,
  };
}

export function resetGlobalError() {
  return {
    type: RESET_GLOBAL_ERROR,
  };
}
