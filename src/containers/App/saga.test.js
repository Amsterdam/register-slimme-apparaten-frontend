/* eslint-disable redux-saga/no-unhandled-errors */
import { all, put, takeLatest } from 'redux-saga/effects';

import { authCall } from 'shared/services/api/api';
import watchAppSaga, { callAuthorize } from './saga';
import { AUTHENTICATE_USER } from './constants';
import { authorizeUser, showGlobalError } from './actions';

jest.mock('../../shared/services/auth/auth');
jest.mock('shared/services/api/api');

describe('App saga', () => {
  beforeEach(() => {
    global.window.open = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should watchAppSaga', () => {
    const gen = watchAppSaga();
    expect(gen.next().value).toEqual(
      all([
        // eslint-disable-line redux-saga/yield-effects
        takeLatest(AUTHENTICATE_USER, callAuthorize), // eslint-disable-line redux-saga/yield-effects
      ]),
    );
  });

  describe('callAuthorize', () => {
    const payload = {
      accessToken: 'akjgrff',
      userName: 'foo@bar.com',
      userScopes: ['SIG/ALL'],
    };

    it('should success', () => {
      const mockCredentials = {
        accessToken: 'akjgrff',
        userName: 'foo@bar.com',
        userScopes: ['SIG/ALL'],
      };
      const gen = callAuthorize({ payload });
      expect(gen.next().value).toEqual(authCall('https://acc.api.data.amsterdam.nl/signals/auth/me', null, 'akjgrff')); // eslint-disable-line redux-saga/yield-effects
      expect(
        gen.next({
          groups: ['SIG/ALL'],
        }).value,
      ).toEqual(put(authorizeUser(mockCredentials))); // eslint-disable-line redux-saga/yield-effects
    });

    it('should success', () => {
      const mockCredentials = {
        accessToken: 'akjgrff',
        userName: 'foo@bar.com',
        userScopes: ['SIG/ALL'],
      };
      const gen = callAuthorize({ payload });
      expect(gen.next().value).toEqual(authCall('https://acc.api.data.amsterdam.nl/signals/auth/me', null, 'akjgrff')); // eslint-disable-line redux-saga/yield-effects
      expect(
        gen.next({
          groups: ['SIG/ALL'],
        }).value,
      ).toEqual(put(authorizeUser(mockCredentials))); // eslint-disable-line redux-saga/yield-effects
    });

    it('should fail without message when accessToken is not available', () => {
      const gen = callAuthorize({ payload: null });
      expect(gen.next().value).toBeUndefined();
    });

    it('should error', () => {
      const gen = callAuthorize({ payload });
      gen.next();
      expect(gen.throw().value).toEqual(put(showGlobalError('AUTHORIZE_FAILED'))); // eslint-disable-line redux-saga/yield-effects
    });
  });
});
