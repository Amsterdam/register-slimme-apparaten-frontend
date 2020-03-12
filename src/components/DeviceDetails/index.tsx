import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

import APP_ROUTES from 'services/appRoutes';
import CloseIcon from '../../images/icon-cross-big.svg';
import QuestionMarkIcon from '../../images/icon-question-mark.svg';
import MailIcon from '../../images/icon-mail.svg';
import convertor from './services/convertor';
import './style.scss';

export interface Device {
  id: number;
  soort?: string;
  category?: string;
  contact?: string;
  organisation?: string;
  privacy?: string;
  properties?: {
    display?: string;
  };
}

export interface DeviceDataItem {
  key: string;
  value?: string;
  buttonAction?: string;
  isLink?: boolean;
}

export interface Props {
  device?: Device;
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
  const deviceData = convertor[selectedLayer].getData(device);

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
            <div className="device-details__row-label">{deviceData.title}</div>
          </div>
          {deviceData.props.map(({ key, value, buttonAction, isLink }: DeviceDataItem) => (
            <div key={key}>
              {value && (
                <div className="device-details__row">
                  <div className="device-details__row-label">{key}</div>
                  <div className="device-details__row-element">
                    {isLink ? (
                      <a href={value} target="_blank" rel="noopener noreferrer">
                        {value}
                      </a>
                    ) : value}

                    {buttonAction &&
                      <button
                        data-testid="categoriesButton"
                        type="button"
                        className="device-details__question-mark-button"
                        onClick={() => {
                          history.push(buttonAction);
                        }}
                      >
                        <QuestionMarkIcon />
                      </button>
                    }
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {deviceData.hasOwner  &&
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
