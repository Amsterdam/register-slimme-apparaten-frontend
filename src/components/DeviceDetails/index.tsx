import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import APP_ROUTES from 'services/appRoutes';
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
      display: string;
      Privacyverklaring?: string;
    };
  },
  selectedLayer: string;
  onDeviceDetailsClose: MouseEvent<HTMLButtonElement, MouseEvent>,
}

const StyledButton = styled(Button)`
  margin: ${themeSpacing(2, 6)};
`;

const DeviceDetails: React.FC<Props> = ({
  onDeviceDetailsClose,
  selectedLayer,
  device,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { soort, category, organisation, properties } = device || {};
  const { display, Privacyverklaring } = properties || {};

  return (
    <section id="device-details" className="device-details">

      <div className="device-details__heading">
        <button
          type="button"
          data-testid="closeButton"
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
            <div className="device-details__row-label">{selectedLayer === 'cameras' ? 'Gebied' : 'Apparaat'}</div>
          </div>
          <div className="device-details__row">
            <div className="device-details__row-label">Categorie</div>
            <div className="device-details__row-element">{selectedLayer === 'cameras'  ? 'Camera toezichtsgebied' : category}</div>

            <button
              data-testid="categoriesButton"
              type="button"
              className="device-details__question-mark-button"
              onClick={() => {
                history.push(APP_ROUTES.CATEGORIES);
              }}
            >
              <QuestionMarkIcon />
            </button>

          </div>
          {soort && (
            <div className="device-details__row">
              <div className="device-details__row-label">Type</div>
              <div className="device-details__row-element">{soort}</div>
            </div>
          )}
          {organisation && (
            <div className="device-details__row">
              <div className="device-details__row-label">Organisatie</div>
              <div className="device-details__row-element">{organisation}</div>
            </div>
          )}
          {Privacyverklaring && (
            <div className="device-details__row">
              <div className="device-details__row-label">Privacyverklaring</div>
              <div className="device-details__row-element">
                <a href={Privacyverklaring} target="_blank" rel="noopener noreferrer">
                  {Privacyverklaring}
                </a>
              </div>
            </div>
          )}
          {display && (
            <div className="device-details__row">
              <div className="device-details__row-label">Naam</div>
              <div className="device-details__row-element">{display}</div>
            </div>
          )}
        </div>
        {selectedLayer === 'devices'  &&
          <StyledButton
            variant="primary"
            data-testid="contactButton"
            iconLeft={<MailIcon />}
            onClick={() => {
              history.push(`${APP_ROUTES.CONTACT}/${location.search}`);
            }}
          >
            Contact met eigenaar
          </StyledButton>
        }
      </div>
    </section>
  );
};

export default DeviceDetails;
