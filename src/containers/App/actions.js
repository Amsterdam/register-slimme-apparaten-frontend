import { AUTHENTICATE_USER, AUTHORIZE_USER, SHOW_GLOBAL_ERROR, RESET_GLOBAL_ERROR } from './constants';

export function authenticateUser(credentials) {
  return {
    type: AUTHENTICATE_USER,
    payload: credentials,
  };
}

export function authorizeUser(credentials) {
  return {
    type: AUTHORIZE_USER,
    payload: credentials,
  };
}

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
