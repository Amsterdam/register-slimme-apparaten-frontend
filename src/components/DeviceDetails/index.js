import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getMarkerCategory } from '../../services/iotmap';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
import MailIcon from '../../images/icon-mail.svg';
import Modal from '../../components/Modal';
import DeviceCategories from '../Modal/DeviceCategories';
import withModal from '../withModal';
import ContactForm from '../Modal/ContactForm';

import './style.scss';

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactModalActive: false,
      isMapPreviewPanelVisible: true,
      typesModalActive: false,
    };
  }

  activateContactModal = () => {
    this.setState({ contactModalActive: true, typesModalActive: false }, this.props.activateModal());
  }

  activateTypesModal = () => {
    this.setState({ contactModalActive: false, typesModalActive: true }, this.props.activateModal());
  }

  render() {
    const { contactModalActive, typesModalActive } = this.state;
    const { modalActive, device } = this.props;

    const ContactButton = (
      <button className="device-details__contact-button action secundary-blue" onClick={this.activateContactModal}>
        <MailIcon />Contact met eigenaar
      </button>
    );

    const TypesButton = (
      <button className="device-details__question-mark-button" onClick={this.activateTypesModal}>
        <QuestionMarkIcon />
      </button>
    );

    return (
      <Fragment>
        <section id="device-details" className="device-details">
          <div className="device-details__heading">
            <button
              className="device-details__button"
              onClick={this.props.onDeviceDetailsClose}
              title="Sluiten"
            >
              <CloseIcon className="device-details__button-icon" />
            </button>
          </div>

          <div className="device-details__body">
            <div className="device-details__table">
              <div className="device-details__header-row device-details__row">
                <div className="device-details__row-label">Apparaat</div>
                <div className="device-details__row-element">{this.props.device.name}</div>
              </div>

              <div className="device-details__row">
                <div className="device-details__row-label">Categorie</div>
                <div className="device-details__row-element">{getMarkerCategory(this.props.device).name}</div>
                {TypesButton}
              </div>

              {this.props.device.types && (
                <div className="device-details__row">
                  <div className="device-details__row-label">Type</div>
                  <div className="device-details__row-element">{(this.props.device.types.length && this.props.device.types[0].name) || 'Onbekend'}</div>
                </div>
              )}
            </div>

            {ContactButton}
          </div>
        </section>

        {modalActive && contactModalActive && (
          <Modal
            id="contact-modal"
            ariaLabel="Contact met eigenaar"
          >
            <ContactForm deviceId={device.id} />
          </Modal>
        )}

        {modalActive && typesModalActive && (
          <Modal
            id="categories-modal"
            ariaLabel="Apparaat categorieën"
          >
            <DeviceCategories />
          </Modal>
        )}
      </Fragment>
    );
  }
}

DeviceDetails.propTypes = {
  activateModal: PropTypes.func.isRequired,
  device: PropTypes.shape({
    id: PropTypes.number,
    types: PropTypes.array.isRequired,
    name: PropTypes.string, // Back-end does not provide value at this time
  }).isRequired,
  modalActive: PropTypes.bool.isRequired,
  onDeviceDetailsClose: PropTypes.func
};

const DeviceDetailsWithModal = withModal(DeviceDetails);

export {
  DeviceDetailsWithModal as default,
  DeviceDetails as DeviceDetailsComponent,
};
