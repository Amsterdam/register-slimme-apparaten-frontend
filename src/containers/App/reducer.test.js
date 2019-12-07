import appReducer, { initialState } from './reducer';

describe('appReducer', () => {
  beforeEach(() => {});

  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });
});
