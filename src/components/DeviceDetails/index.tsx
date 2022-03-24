import { Close } from '@amsterdam/asc-assets';
import { themeSpacing, List, ListItem, Link, themeColor, Button } from '@amsterdam/asc-ui';
import styled from 'styled-components';

import './style.scss';

export interface Props {
  feature: any | null;
  onClose: () => void;
}

const InfoContainer = styled('div')`
  padding-top: ${themeSpacing(1)};
  padding-bottom: ${themeSpacing(1)};

  border-bottom: 2px solid ${themeColor('tint', 'level2')};
`;

const NoMarginH3 = styled.h3`
  margin-top: 0px;
`;

const CloseButton = styled(Button)`
  min-width: inherit;
  margin-right: -16px;

  > span {
    margin-right: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const DeviceDetails: React.FC<Props> = ({ feature, onClose }) => {
  if (!feature) {
    return null;
  }

  const { sensorType, organisation, privacy, contact, activeUntil, goal, legalGround, reference, containsPiData } =
    feature.properties;

  return (
    <section id="device-details">
      <ButtonContainer>
        <CloseButton
          type="button"
          variant="blank"
          title="Legenda"
          data-testid="legenda"
          iconSize={20}
          onClick={onClose}
          iconLeft={<Close />}
        />
      </ButtonContainer>
      <InfoContainer>
        <NoMarginH3>Verantwoordelijke voor de sensor</NoMarginH3>
        <List variant="bullet">
          <ListItem>{contact?.name}</ListItem>
          <ListItem>{organisation}</ListItem>
          {contact?.email?.length > 1 && <ListItem>{contact?.email}</ListItem>}
          <ListItem>{!!containsPiData ? 'Verwerkt persoonsgegevens' : 'Verwerkt geen persoonsgegevens'}</ListItem>
          {!!privacy && (
            <ListItem>
              <Link href={privacy} variant="inline" icon="external" target="_blank">
                Privacyverklaring
              </Link>
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
