import { testActionCreator } from 'test/utils';
import { SHOW_GLOBAL_ERROR, RESET_GLOBAL_ERROR } from './constants';

import { showGlobalError, resetGlobalError } from './actions';

describe('App actions', () => {
  it('should dispatch show global error action', () => {
    const payload = 'global error';
    testActionCreator(showGlobalError, SHOW_GLOBAL_ERROR, payload);
  });

  it('should dispatch reset global error action', () => {
    testActionCreator(resetGlobalError, RESET_GLOBAL_ERROR);
  });
});
