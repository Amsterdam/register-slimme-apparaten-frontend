import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';

import './style.scss';

const CameraAreaDetails = props => {
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
        <button type="button" className="device-details__button" onClick={props.onDeviceDetailsClose} title="Sluiten">
          <CloseIcon className="device-details__button-icon" />
        </button>
      </div>
      <div className="device-details__body">
        <div className="device-details__table">
          <div className="device-details__header-row device-details__row">
            <div className="device-details__row-label">Gebied</div>
          </div>
          <div className="device-details__row">
            <div className="device-details__row-label">Categorie</div>
            <div className="device-details__row-element">Camera toezichtsgebied</div>
            {TypesButton}
          </div>

          <div className="device-details__row">
            <div className="device-details__row-label">Naam</div>
            <div className="device-details__row-element">{props.device.properties.display}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

CameraAreaDetails.propTypes = {
  onDeviceDetailsClose: PropTypes.func,
  device: PropTypes.shape({
    properties: PropTypes.shape({
      display: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default CameraAreaDetails;
