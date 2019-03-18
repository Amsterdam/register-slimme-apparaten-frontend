import React, { Component, createContext } from 'react';

const ModalContext = createContext();

const withModal = (WrappedComponent) => class WithModal extends Component {
  constructor(props) {
    super(props);

    const activateModal = this.activateModal.bind(this);
    const deactivateModal = this.deactivateModal.bind(this);

    this.state = {
      activateModal,
      deactivateModal,
      modalActive: false
    };
  }

  activateModal = () => {
    this.setState({ modalActive: true });
  }

  deactivateModal = () => {
    this.setState({ modalActive: false });
  }

  render() {
    const props = {
      ...this.props,
      ...this.state,
    };

    return (
      <ModalContext.Provider value={{ ...props }}>
        <WrappedComponent {...props} />
      </ModalContext.Provider>
    );
  }
};

export {
  withModal as default,
  ModalContext,
};
