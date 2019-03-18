/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Modal from './';

describe('Modal', () => {
  let innerHTML;

  beforeAll(() => {
    innerHTML = global.document.body.innerHTML;
  });

  afterEach(() => {
    global.document.body.innerHTML = innerHTML;
  });

  it('should render and unmount', () => {
    const div = global.document.createElement('div');
    ReactDOM.render(
      <Modal id="foo" ariaLabel="My modal">
        <p>Content</p>
      </Modal>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have an accessible markup', () => {
    const wrapper = mount(
      <Modal id="foo" ariaLabel="My modal">
        <p>Content</p>
      </Modal>
    );
    expect(wrapper.find('div[id="foo"][aria-hidden="true"]').length).toBe(1);
    expect(
      wrapper.find('div[data-micromodal-close][tabIndex="-1"]').length
    ).toBe(1);
    expect(wrapper.find('div[role="dialog"][aria-modal="true"]').length).toBe(
      1
    );
  });

  it('should conditionally render the content', () => {
    const wrapper = mount(
      <Modal id="foo" ariaLabel="My modal">
        <p>Content</p>
      </Modal>
    );
    expect(wrapper.find('p').length).toBe(0);
    wrapper.setProps({ renderOnlyOnShow: false });
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should throw an error when same IDs are found', () => {
    const { error } = console;
    console.error = jest.fn(); // eslint-disable-line no-console

    const id = 'foo';

    global.document.body.innerHTML = `<div id="${id}"></div>`;
    expect(() =>
      mount(
        <Modal id={id} ariaLabel="My modal">
          <p>Content</p>
        </Modal>
      )
    ).toThrow('There is on the DOM an element with the same `id` (foo).');

    global.document.body.innerHTML = '<div id="bar"></div>';
    expect(() =>
      mount(
        <Modal id={id} ariaLabel="My modal">
          <p>Content</p>
        </Modal>
      )
    ).not.toThrow();

    // restoring console
    console.error = error; // eslint-disable-line no-console
  });

  it('should remove the holder on unmount', () => {
    const originalChildrenLength = global.document.body.children.length;
    const wrapper = mount(
      <Modal id="foo" ariaLabel="My modal">
        <p>Content</p>
      </Modal>
    );

    expect(global.document.body.children.length).toBe(
      originalChildrenLength + 1
    );
    wrapper.unmount();
    expect(global.document.body.children.length).toBe(originalChildrenLength);
  });
});
