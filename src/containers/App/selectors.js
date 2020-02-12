import { createSelector } from 'reselect';

const selectGlobal = state => state.global;

const makeSelectUserName = () => createSelector(selectGlobal, globalState => globalState.userName);

const makeSelectAccessToken = () => createSelector(selectGlobal, globalState => globalState.accessToken);

const makeSelectLoading = () => createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () => createSelector(selectGlobal, globalState => globalState.error);

const makeSelectErrorMessage = () => createSelector(selectGlobal, globalState => globalState.errorMessage);

const makeSelectIsAuthenticated = () => createSelector(selectGlobal, globalState => !globalState.accessToken === false);

export {
  selectGlobal,
  makeSelectUserName,
  makeSelectAccessToken,
  makeSelectLoading,
  makeSelectError,
  makeSelectErrorMessage,
  makeSelectIsAuthenticated,
};
