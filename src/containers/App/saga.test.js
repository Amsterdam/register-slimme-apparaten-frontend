import { all, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { authCall } from 'shared/services/api/api';
import watchAppSaga, { callLogin, callLogout, callAuthorize } from './saga';
import { LOGIN, LOGOUT, AUTHENTICATE_USER } from './constants';
import { authorizeUser, showGlobalError } from './actions';
import { login, logout, getOauthDomain } from '../../shared/services/auth/auth';

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
    expect(gen.next().value).toEqual(all([ // eslint-disable-line redux-saga/yield-effects
      takeLatest(LOGIN, callLogin), // eslint-disable-line redux-saga/yield-effects
      takeLatest(LOGOUT, callLogout), // eslint-disable-line redux-saga/yield-effects
      takeLatest(AUTHENTICATE_USER, callAuthorize), // eslint-disable-line redux-saga/yield-effects
    ])
    );
  });

  describe('login', () => {
    const payload = 'datapunt';

    it('should success', () => {
      const gen = callLogin({ payload });
      gen.next();
      expect(login).toHaveBeenCalledWith(payload);
    });

    // @TODO fix this test
    // it.only('should error', () => {
    // const gen = callLogin({ payload });
    // gen.next();
    // expect(gen.throw().value).toEqual(put(showGlobalError('LOGIN_FAILED'))); // eslint-disable-line redux-saga/yield-effects
    // expect(1).toBe(1);
    // });
  });

  describe('logout', () => {
    it('should success', () => {
      getOauthDomain.mockImplementation(() => '');
      const gen = callLogout();
      const value = gen.next().value;
      expect(value).toEqual(put(push('/'))); // eslint-disable-line redux-saga/yield-effects
      expect(logout).toHaveBeenCalledWith();
    });

    it('should grip success', () => {
      getOauthDomain.mockImplementation(() => 'grip');
      const gen = callLogout();
      gen.next();
      expect(window.open).toHaveBeenCalledWith('https://auth.grip-on-it.com/v2/logout?tenantId=rjsfm52t', '_blank');
    });

    it('should error', () => {
      // const error = new Error();
      const gen = callLogout();
      gen.next();
      expect(gen.throw().value).toEqual(put(showGlobalError('LOGOUT_FAILED'))); // eslint-disable-line redux-saga/yield-effects
    });
  });

  describe('callAuthorize', () => {
    const payload = {
      accessToken: 'akjgrff',
      userName: 'foo@bar.com',
      userScopes: [
        'SIG/ALL'
      ]
    };

    it('should success', () => {
      const mockCredentials = {
        accessToken: 'akjgrff',
        userName: 'foo@bar.com',
        userScopes: ['SIG/ALL']
      };
      const gen = callAuthorize({ payload });
      expect(gen.next().value).toEqual(authCall('https://acc.api.data.amsterdam.nl/signals/auth/me', null, 'akjgrff')); // eslint-disable-line redux-saga/yield-effects
      expect(gen.next({
        groups: ['SIG/ALL']
      }).value).toEqual(put(authorizeUser(mockCredentials))); // eslint-disable-line redux-saga/yield-effects
    });

    it('should success', () => {
      const mockCredentials = {
        accessToken: 'akjgrff',
        userName: 'foo@bar.com',
        userScopes: ['SIG/ALL']
      };
      const gen = callAuthorize({ payload });
      expect(gen.next().value).toEqual(authCall('https://acc.api.data.amsterdam.nl/signals/auth/me', null, 'akjgrff')); // eslint-disable-line redux-saga/yield-effects
      expect(gen.next({
        groups: ['SIG/ALL']
      }).value).toEqual(put(authorizeUser(mockCredentials))); // eslint-disable-line redux-saga/yield-effects
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
