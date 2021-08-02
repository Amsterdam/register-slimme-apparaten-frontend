import React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@amsterdam/asc-ui';

import configureStore from '../configureStore';

export const history = createMemoryHistory();

type Payload = {
  type?: string;
};

export const testActionCreator = (action: () => void, actionType: string, payload: Payload): void => {
  const expected = {
    type: actionType,
    payload,
  };
  expect(action(payload)).toEqual(expected);
};

export const store = configureStore({}, history);

export const withAppContext = (Component: React.ReactNode): React.ReactNode => (
  <ThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>{Component}</ConnectedRouter>
    </Provider>
  </ThemeProvider>
);
