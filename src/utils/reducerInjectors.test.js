/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import identity from 'lodash/identity';

import configureStore from '../configureStore';

import getInjectors, { injectReducerFactory } from './reducerInjectors';

// Fixtures

const initialState = { reduced: 'soon' };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return { ...state, reduced: action.payload };
    default:
      return state;
  }
};

describe('reducer injectors', () => {
  let store;
  let injectReducer;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
    });

    it('should return injectors', () => {
      expect(getInjectors(store)).toEqual(
        expect.objectContaining({
          injectReducer: expect.any(Function),
        }),
      );
    });
  });

  describe('injectReducer helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
      injectReducer = injectReducerFactory(store, true);
    });

    it('should not assign reducer if already existing', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', reducer);

      expect(store.replaceReducer).toHaveBeenCalledTimes(1);
    });

    it('should assign reducer if different implementation for hot reloading', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', identity);

      expect(store.replaceReducer).toHaveBeenCalledTimes(2);
    });
  });
});
