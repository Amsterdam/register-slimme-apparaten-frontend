import '@testing-library/jest-dom/extend-expect';
import 'core-js/shim';
import 'regenerator-runtime';
import 'raf/polyfill';
import 'jest-localstorage-mock';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

/**
 * Element.closest() polyfill
 *
 * Both Jest and JSDOM don't offer support for Element.closest()
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest}
 * @see {@link https://github.com/jsdom/jsdom/issues/1555}
 */
window.Element.prototype.closest = function closest(selector) {
  let el = this;
  while (el) {
    if (el.matches(selector)) {
      return el;
    }
    el = el.parentElement;
  }

  return el;
};
