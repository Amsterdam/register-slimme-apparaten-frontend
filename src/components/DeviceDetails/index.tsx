import React, { FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { themeSpacing, List, ListItem, Link, themeColor } from '@amsterdam/asc-ui';
import styled from 'styled-components';

import './style.scss';
import { ItemType } from 'utils/types';

export interface Props {
  device: ItemType | null;
  onDeviceDetailsClose: (event: FormEvent<HTMLButtonElement>) => void;
}

const InfoContainer = styled('div')`
  padding-top: ${themeSpacing(1)};
  padding-bottom: ${themeSpacing(1)};

  border-top: 2px solid ${themeColor('tint', 'level2')};
  border-bottom: 2px solid ${themeColor('tint', 'level2')};
`;

const DeviceDetails: React.FC<Props> = ({ onDeviceDetailsClose, device }) => {
  const location = useLocation();

  if (!device) {
    return null;
  }

  const { category, soort, organisation, privacy } = device;

  return (
    <section id="device-details">
      <h2>{category}</h2>

      <InfoContainer>
        <h3>Verantwoordelijke voor de sensor</h3>
        <List variant="bullet">
          <ListItem>{organisation}</ListItem>
          <ListItem>info@bedrijf.nl</ListItem>
          <ListItem>
            <Link href={privacy}>Privacyverklaring</Link>
          </ListItem>
          <ListItem>
            <Link href={`/contact-owner/${location.search}`}>Contact</Link>
          </ListItem>
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Sensorgegevens</h3>
        <List variant="bullet">
          <ListItem>{soort}</ListItem>
        </List>
      </InfoContainer>
      {/* <div className="device-details__table">
        <div className="device-details__row">
          <div className="device-details__row-label">Categorie</div>
          <div className="device-details__row-element">{category}</div>
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
        {privacy && (
          <div className="device-details__row">
            <div className="device-details__row-label">Privacyverklaring</div>
            <div className="device-details__row-element">
              <a href={privacy} target="_blank" rel="noopener noreferrer">
                {privacy}
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
      </StyledButton> */}
    </section>
  );
};

export default DeviceDetails;
