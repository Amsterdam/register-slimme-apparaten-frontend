/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { SHOW_GLOBAL_ERROR, RESET_GLOBAL_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_GLOBAL_ERROR:
      return { ...state, error: !!action.payload, errorMessage: action.payload, loading: false };

    case RESET_GLOBAL_ERROR:
      return { ...state, error: false, errorMessage: '', loading: false };

    default:
      return state;
  }
}

export default appReducer;
