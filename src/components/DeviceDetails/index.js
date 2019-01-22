import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { getMarkerCategory } from '../../services/iotmap';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
import MailIcon from '../../images/icon-mail.svg';

import './style.scss';

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isMapPreviewPanelVisible: true };
  }

  render() {
    if (!this.props.device) return null;

    const ContactButton = (<Route
      render={({ history }) => (
        <button className="device-details__contact-button action secundary-blue" onClick={() => { history.push(`/contact-owner/${this.props.device.id}`); }}>
          <MailIcon />Contact met eigenaar
        </button>
      )}
    />);

    const TypesButton = (<Route
      render={({ history }) => (
        <button className="device-details__question-mark-button" onClick={() => { history.push('/categories'); }}>
          <QuestionMarkIcon></QuestionMarkIcon>
        </button>
      )}
    />);

    return (
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
              { TypesButton }
            </div>
            { this.props.device.types && <div className="device-details__row">
              <div className="device-details__row-label">Type</div>
              <div className="device-details__row-element">{(this.props.device.types.length && this.props.device.types[0].name) || 'Onbekend'}</div>
            </div> }
          </div>
          {ContactButton}
        </div>
      </section>
    );
  }
}

DeviceDetails.propTypes = {
  device: PropTypes.object,
  onDeviceDetailsClose: PropTypes.func
};

export default DeviceDetails;
