import { all, put, takeLatest } from 'redux-saga/effects';

import { authCall } from 'shared/services/api/api';
import CONFIGURATION from 'shared/configuration/environment';

import { AUTHENTICATE_USER } from './constants';
import { showGlobalError, authorizeUser } from './actions';

export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;

export function* callAuthorize(action) {
  try {
    const accessToken = action.payload && action.payload.accessToken;
    if (accessToken) {
      const requestURL = `${baseUrl}`;

      const user = yield authCall(requestURL, null, accessToken);

      const credentials = { ...action.payload, userScopes: [...user.groups] };
      yield put(authorizeUser(credentials));
    }
  } catch (error) {
    yield put(showGlobalError('AUTHORIZE_FAILED'));
  }
}

export default function* watchAppSaga() {
  // eslint-disable-next-line redux-saga/no-unhandled-errors
  yield all([takeLatest(AUTHENTICATE_USER, callAuthorize)]);
}
