import React from 'react';
import { useHistory } from 'react-router-dom';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';

import './style.scss';

export interface Props {
  device: { propertes: { oov_naam: string }, },
  onDeviceDetailsClose: MouseEvent<HTMLButtonElement, MouseEvent>,
}


const CameraAreaDetails: React.FC<Props> = ({
  onDeviceDetailsClose,
  device: {
    properties: {
      oov_naam: string,
    },
  },
}) => {
  const history = useHistory();

  return (
    <section id="device-details" className="device-details">
      <div className="device-details__heading">
        <button type="button" className="device-details__button" onClick={onDeviceDetailsClose} title="Sluiten">
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

          <div className="device-details__row">
            <div className="device-details__row-label">Naam</div>
            <div className="device-details__row-element">{oov_naam}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CameraAreaDetails;
