import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Button, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
import MailIcon from '../../images/icon-mail.svg';

import './style.scss';

const StyledButton = styled(Button)`
  margin: ${themeSpacing(2, 6)};
`;

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const ContactButton = (
      <Route
        render={({ history, location }) => (
          <StyledButton
            variant="primary"
            iconLeft={<MailIcon />}
            onClick={() => {
              history.push(`/contact-owner/${location.search}`);
            }}
          >
            Contact met eigenaar
          </StyledButton>
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
            </div>
            <div className="device-details__row">
              <div className="device-details__row-label">Categorie</div>
              <div className="device-details__row-element">{this.props.device.category}</div>
              {TypesButton}
            </div>
            {this.props.device.soort && (
              <div className="device-details__row">
                <div className="device-details__row-label">Type</div>
                <div className="device-details__row-element">{this.props.device.soort}</div>
              </div>
            )}
            {this.props.device.organisation && (
              <div className="device-details__row">
                <div className="device-details__row-label">Organisatie</div>
                <div className="device-details__row-element">{this.props.device.organisation}</div>
              </div>
            )}
            {this.props.device.privacy && (
              <div className="device-details__row">
                <div className="device-details__row-label">Privacyverklaring</div>
                <div className="device-details__row-element">
                  <a href={this.props.device.privacy} target="_blank" rel="noopener noreferrer">
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
    organisation: PropTypes.string.isRequired,
  }).isRequired,
  onDeviceDetailsClose: PropTypes.func,
};

export default DeviceDetails;
