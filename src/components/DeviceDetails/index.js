import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
import MailIcon from '../../images/icon-mail.svg';

import './style.scss';

const StyledButton = styled(Button)`
  margin: ${themeSpacing(2, 6)};
`;

const DeviceDetails = props => {
  const history = useHistory();
  const location = useLocation();

  return (
    <section id="device-details" className="device-details">
      <div className="device-details__heading">
        <button
          type="button"
          className="device-details__button"
          onClick={props.onDeviceDetailsClose}
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
            <div className="device-details__row-element">{props.device.category}</div>
            <button
              type="button"
              className="device-details__question-mark-button"
              onClick={() => {
                history.push('/categories');
              }}
            >
              <QuestionMarkIcon />
            </button>

          </div>
          {props.device.soort && (
            <div className="device-details__row">
              <div className="device-details__row-label">Type</div>
              <div className="device-details__row-element">{props.device.soort}</div>
            </div>
          )}
          {props.device.organisation && (
            <div className="device-details__row">
              <div className="device-details__row-label">Organisatie</div>
              <div className="device-details__row-element">{props.device.organisation}</div>
            </div>
          )}
          {props.device.privacy && (
            <div className="device-details__row">
              <div className="device-details__row-label">Privacyverklaring</div>
              <div className="device-details__row-element">
                <a href={props.device.privacy} target="_blank" rel="noopener noreferrer">
                  {props.device.privacy}
                </a>
              </div>
            </div>
          )}
        </div>
        <StyledButton
          variant="primary"
          iconLeft={<MailIcon />}
          onClick={() => {
            history.push(`/contact-owner/${location.search}`);
          }}
        >
          Contact met eigenaar
        </StyledButton>
      </div>
    </section>
  );
};


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
