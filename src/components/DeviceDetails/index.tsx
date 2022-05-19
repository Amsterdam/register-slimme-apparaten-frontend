import { Close } from '@amsterdam/asc-assets';
import { themeSpacing, List, ListItem, Link, themeColor, Button } from '@amsterdam/asc-ui';
import styled from 'styled-components';
import { useRegions } from '../../services/regions';
import RegionMap from './RegionMap';
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

const CloseButton = styled(Button)`
  position: absolute;
  top: 14px;
  right: 20px;
  min-width: inherit;

  > span {
    margin-right: 0;
  }
`;

const DeviceDetailsWrapper = styled.section`
  postision: relative;
`;

const DeviceDetails: React.FC<Props> = ({ feature, onClose }) => {
  const regions = useRegions();

  if (!feature) {
    return null;
  }

  const {
    sensorType,
    organisation,
    privacy,
    contact,
    activeUntil,
    goal,
    legalGround,
    reference,
    containsPiData,
    region,
  } = feature.properties;

  return (
    <DeviceDetailsWrapper id="device-details">
      <CloseButton
        type="button"
        variant="blank"
        title="Legenda"
        data-testid="legenda"
        iconSize={20}
        onClick={onClose}
        iconLeft={<Close />}
      />

      {region?.length > 0 && <RegionMap regions={region} />}

      <InfoContainer>
        <h3>Verantwoordelijke voor de sensor</h3>
        <List variant="bullet">
          <ListItem>{contact?.name}</ListItem>
          <ListItem>{organisation}</ListItem>
          {contact?.email?.length > 1 && <ListItem>{contact?.email}</ListItem>}
          <ListItem>{!!containsPiData ? 'Verwerkt persoonsgegevens' : 'Verwerkt geen persoonsgegevens'}</ListItem>
          {Array.isArray(privacy) &&
            privacy.length > 0 &&
            privacy.map((p, index) => (
              <ListItem key={index}>
                <Link href={p} variant="inline" icon="external" target="_blank">
                  Privacyverklaring
                </Link>
              </ListItem>
            ))}
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Sensorgegevens</h3>
        <List variant="bullet">
          <ListItem>{sensorType}</ListItem>
          <ListItem>{region ? 'Mobiele sensor' : 'Vaste sensor'}</ListItem>
          {reference && <ListItem>Referentie: {reference}</ListItem>}
          {region && regions && (
            <ListItem>Gebied: {region.map((r: string) => regions[r.toLowerCase()]?.naam).join(', ')}</ListItem>
          )}
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Doel van de sensor</h3>
        <List variant="bullet">
          {Array.isArray(goal) && goal.length > 0 && (goal as string[]).map((g) => <ListItem key={g}>{g}</ListItem>)}
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Wettelijke grondslag</h3>
        <List variant="bullet">
          {Array.isArray(legalGround) &&
            legalGround.length > 0 &&
            (legalGround as string[]).map((l) => <ListItem key={l}>{l}</ListItem>)}
        </List>
      </InfoContainer>

      <InfoContainer>
        <h3>Sensor actief tot</h3>
        <List variant="bullet">
          <ListItem>{activeUntil}</ListItem>
        </List>
      </InfoContainer>
    </DeviceDetailsWrapper>
  );
};

export default DeviceDetails;
