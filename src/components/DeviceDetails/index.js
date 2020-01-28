import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
import MailIcon from '../../images/icon-mail.svg';

import './style.scss';

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const ContactButton = (
      <Route
        render={({ history }) => (
          <button
            type="button"
            className="device-details__contact-button action secundary-blue"
            onClick={() => {
              history.push(`/contact-owner/${this.props.device.contact}/${this.props.device.id}`);
            }}
          >
            <MailIcon />
            Contact met eigenaar
          </button>
        )}
      />
    );

    const TypesButton = (
      <Route
        render={({ history }) => (
          <button
            type="button"
            className="device-details__question-mark-button"
            onClick={() => {
              history.push('/categories');
            }}
          >
            <QuestionMarkIcon />
          </button>
        )}
      />
    );

    return (
      <section id="device-details" className="device-details">
        <div className="device-details__heading">
          <button
            type="button"
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
              <div className="device-details__row-element">{this.props.device.category}</div>
              {TypesButton}
            </div>
            {this.props.device.soort && (
              <div className="device-details__row">
                <div className="device-details__row-label">Type</div>
                <div className="device-details__row-element">{this.props.device.soort || 'Onbekend'}</div>
              </div>
            )}
            {this.props.device.privacy && (
              <div className="device-details__row">
                <div className="device-details__row-label">Privacyverklaring</div>
                <div className="device-details__row-element"><a href={this.props.device.privacy} target="_blank">
                  {this.props.device.privacy}
                </a>
                </div>
              </div>
            )}
          </div>
          {ContactButton}
        </div>
      </section>
    );
  }
}

DeviceDetails.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string, // Back-end does not provide value at this time
    soort: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    privacy: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
  }).isRequired,
  onDeviceDetailsClose: PropTypes.func,
};

export default DeviceDetails;
