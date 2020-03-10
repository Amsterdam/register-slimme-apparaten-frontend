import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
import MailIcon from '../../images/icon-mail.svg';

import './style.scss';

export interface Props {
  device?: {
    id: number;
    name?: string; // Back-end does not provide value at this time
    soort?: string;
    category?: string;
    privacy?: string;
    contact?: string;
    organisation?: string;
    properties?: {
      display: string
    };
  },
  isAreaCamera: boolean;
  onDeviceDetailsClose: MouseEvent<HTMLButtonElement, MouseEvent>,
}

const StyledButton = styled(Button)`
  margin: ${themeSpacing(2, 6)};
`;

const DeviceDetails: React.FC<Props> = ({
  onDeviceDetailsClose,
  isAreaCamera,
  device,
}) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <section id="device-details" className="device-details">

      <div className="device-details__heading">
        <button
          type="button"
          className="device-details__button"
          onClick={onDeviceDetailsClose}
          title="Sluiten"
        >
          <CloseIcon className="device-details__button-icon" />
        </button>
      </div>
      <div className="device-details__body">
        <div className="device-details__table">
          <div className="device-details__header-row device-details__row">
            <div className="device-details__row-label">{isAreaCamera ? 'Gebied' : 'Apparaat'}</div>
          </div>
          <div className="device-details__row">
            <div className="device-details__row-label">Categorie</div>
            <div className="device-details__row-element">{isAreaCamera ? 'Camera toezichtsgebied' : device?.category}</div>

            {!isAreaCamera &&
              <button
                type="button"
                className="device-details__question-mark-button"
                onClick={() => {
                  history.push('/categories');
                }}
              >
                <QuestionMarkIcon />
              </button>
            }

          </div>
          {device?.soort && (
            <div className="device-details__row">
              <div className="device-details__row-label">Type</div>
              <div className="device-details__row-element">{device?.soort}</div>
            </div>
          )}
          {device?.organisation && (
            <div className="device-details__row">
              <div className="device-details__row-label">Organisatie</div>
              <div className="device-details__row-element">{device?.organisation}</div>
            </div>
          )}
          {device?.privacy && (
            <div className="device-details__row">
              <div className="device-details__row-label">Privacyverklaring</div>
              <div className="device-details__row-element">
                <a href={device?.privacy} target="_blank" rel="noopener noreferrer">
                  {device?.privacy}
                </a>
              </div>
            </div>
          )}
          {device?.properties?.display && (
            <div className="device-details__row">
              <div className="device-details__row-label">Naam</div>
              <div className="device-details__row-element">{device?.properties?.display}</div>
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

export default DeviceDetails;
