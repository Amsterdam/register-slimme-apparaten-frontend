import { createSelector } from 'reselect';

const selectGlobal = (state) => state.global;

const makeSelectError = () => createSelector(selectGlobal, (globalState) => globalState.error);

const makeSelectErrorMessage = () => createSelector(selectGlobal, (globalState) => globalState.errorMessage);

export { selectGlobal, makeSelectError, makeSelectErrorMessage };
