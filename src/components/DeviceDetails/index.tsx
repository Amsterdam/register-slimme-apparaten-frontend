import { Close } from '@amsterdam/asc-assets';
import { themeSpacing, List, ListItem, Link, themeColor, Button } from '@amsterdam/asc-ui';
import styled from 'styled-components';

import './style.scss';

export interface Props {
  feature: any | null;
  showLegend: () => void;
}

const InfoContainer = styled('div')`
  padding-top: ${themeSpacing(1)};
  padding-bottom: ${themeSpacing(1)};

  border-bottom: 2px solid ${themeColor('tint', 'level2')};
`;

const CloseButton = styled(Button)`
  min-width: inherit;
`;

const DeviceDetails: React.FC<Props> = ({ feature, showLegend }) => {
  if (!feature) {
    return null;
  }

  const { sensorType, organisation, privacy, contact, activeUntil, goal, legalGround, reference, containsPiData } =
    feature.properties;

  return (
    <section id="device-details">
      <CloseButton
        type="button"
        variant="blank"
        title="Legenda"
        data-testid="legenda"
        iconSize={20}
        onClick={showLegend}
        iconLeft={<Close />}
      />
      <InfoContainer>
        <h3>Verantwoordelijke voor de sensor</h3>
        <List variant="bullet">
          <ListItem>{contact?.name}</ListItem>
          <ListItem>{organisation}</ListItem>
          {contact?.email?.length > 1 && <ListItem>{contact?.email}</ListItem>}
          <ListItem>{!!containsPiData ? 'Verwerkt persoonsgegevens' : 'Verwerkt geen persoonsgegevens'}</ListItem>
          {!!privacy && (
            <ListItem>
              <Link href={privacy}>Privacyverklaring</Link>
            </ListItem>
          )}
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Sensorgegevens</h3>
        <List variant="bullet">
          <ListItem>{sensorType}</ListItem>
          {reference && <ListItem>Referentie: {reference}</ListItem>}
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
