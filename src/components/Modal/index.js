import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';
import { ModalContext } from '../withModal';

import './style.scss';

/**
 * An accessible Modal component built on top of [MicroModal](https://micromodal.now.sh/)
 */
class Modal extends Component {
  static contextType = ModalContext;

  static hasSameId(id) {
    return global.document.getElementById(id) !== null;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      isReady: false,
    };

    this.root = global.document.querySelector('body');
    this.holder = null;
  }

  componentDidMount() {
    const { id } = this.props;

    // Check if there is an element (modal content) with the same `id` in the DOM and throws an error if it exists.
    // This is necessary because, although the component can be rendered and the modal initialised, its reference
    // (id) might not match the correct element and don't show the expected modal content on user interaction
    if (Modal.hasSameId(id)) {
      throw new Error(`There is on the DOM an element with the same \`id\` (${id}). Change the \`prop.id\` to a unique identifier.`);
    }

    this.createPortalHolder();
  }

  componentWillUnmount() {
    this.root.removeChild(this.holder);
  }

  createPortalHolder() {
    this.holder = global.document.createElement('div');
    this.root.appendChild(this.holder);
    this.setState({ isReady: true });
  }

  render() {
    const { ariaLabel, children } = this.props;
    const { isReady } = this.state;

    return isReady && (
      <ModalContext.Consumer>
        {({ deactivateModal, modalActive }) => (
          <AriaModal
            applicationNode={this.holder}
            titleId={ariaLabel}
            onExit={deactivateModal}
            focusDialog
            verticallyCenter
            mounted={modalActive}
            includeDefaultStyles={false}
            underlayClass="modal-underlay"
            dialogClass="modal-inner"
          >
            <button className="modal-close" onClick={deactivateModal} tabIndex="0">
              <small>Sluiten</small>
            </button>

            {children}
          </AriaModal>
        )}
      </ModalContext.Consumer>
    );
  }
}

Modal.propTypes = {
  /** the label of the Modal */
  ariaLabel: PropTypes.string.isRequired,
  /** Modal's content */
  children: PropTypes.node.isRequired,
  // /** Modal deactivation handler */
  // deactivateModal: PropTypes.func.isRequired,
  /** HTMLElement id. Must be unique throughout the DOM */
  id: PropTypes.string.isRequired,
};

export default Modal;
