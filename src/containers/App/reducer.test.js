import appReducer, { initialState } from './reducer';

describe('appReducer', () => {
  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });
});
