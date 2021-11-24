import React, { FormEvent } from 'react';
import { themeSpacing, List, ListItem, Link, themeColor } from '@amsterdam/asc-ui';
import styled from 'styled-components';

import './style.scss';

export interface Props {
  feature: any | null;
  onDeviceDetailsClose: (event: FormEvent<HTMLButtonElement>) => void;
}

const InfoContainer = styled('div')`
  padding-top: ${themeSpacing(1)};
  padding-bottom: ${themeSpacing(1)};

  border-top: 2px solid ${themeColor('tint', 'level2')};
  border-bottom: 2px solid ${themeColor('tint', 'level2')};
`;

const DeviceDetails: React.FC<Props> = ({ onDeviceDetailsClose, feature }) => {
  if (!feature) {
    return null;
  }

  const { category, sensorType, organisation, privacy, contact, activeUntil, goal, legalGround } = feature.properties;

  return (
    <section id="device-details">
      <h2>{category}</h2>

      <InfoContainer>
        <h3>Verantwoordelijke voor de sensor</h3>
        <List variant="bullet">
          <ListItem>{contact?.name}</ListItem>
          <ListItem>{organisation}</ListItem>
          <ListItem>{contact?.email}</ListItem>
          <ListItem>
            <Link href={privacy}>Privacyverklaring</Link>
          </ListItem>
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Sensorgegevens</h3>
        <List variant="bullet">
          <ListItem>{sensorType}</ListItem>
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Doel van de sensor</h3>
        <List variant="bullet">
          <ListItem>{goal}</ListItem>
          {legalGround && <ListItem>{legalGround}</ListItem>}
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Sensor actief tot</h3>
        <List variant="bullet">
          <ListItem>{activeUntil}</ListItem>
        </List>
      </InfoContainer>
    </section>
  );
};

export default DeviceDetails;
