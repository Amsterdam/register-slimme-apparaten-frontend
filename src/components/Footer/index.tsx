import React from 'react';

import './style.scss';
import styled from '@datapunt/asc-core';
import {
  Footer as AscFooter,
  FooterTop,
  Row,
  Column,
  FooterToggle,
  FooterContent,
  FooterLinkList,
  FooterLinkListItem,
  Link,
  FooterHeading,
} from '@datapunt/asc-ui';

const StyledFooter = styled(AscFooter)`
  .;
`;

const desclaimers = [
  `Het register biedt geen compleet overzicht van alle slimme apparaten. Registratie van slimme apparaten in het register is niet verplicht, maar wordt wel gevraagd.`,
  `De "slimme apparaten" in het register zijn van diverse organisaties.`,
  `De gegevens van de eigenaar van het slimme apparaat worden niet getoond i.v.m. privacy.`,
  `De eigenaar bepaalt of hij reageert; hij is dat niet verplicht.`,
  `Uw mail wordt niet gearchiveerd in het register. Ook uw persoonlijke gegevens worden niet geregistreerd in het register.`,
  `De gegevens van de apparaten in het register worden overgenomen van de eigenaar. Die is verantwoordelijk voor de juistheid en volledigheid van de gegevens.`,
  `OIS, onderdeel van Gemeente Amsterdam, kan niet aansprakelijk worden gesteld voor de juistheid, volledigheid en actualiteit van de website. De Gemeente Amsterdam, OIS kan in het bijzonder niet aansprakelijk worden gesteld voor eventuele schade of consequenties ontstaan door direct of indirect gebruik van de inhoud van de website.`,
];

const DisclaimerLinks: React.FC<{ indent?: boolean }> = () => (
  <FooterLinkList>
    {desclaimers.map(disclaimer => (
      <FooterLinkListItem>
        <Link href="/" variant="with-chevron" >
          {disclaimer}
        </Link>
      </FooterLinkListItem>
    ))}
  </FooterLinkList>
);

function Footer() {
  return (
    <StyledFooter>
      <FooterTop>
        <Row>
          <Column wrap span={{ small: 1, medium: 2, big: 4, large: 8, xLarge: 8 }}>
            <React.Fragment>
              <FooterToggle title="Disclaimer" hideAt="tabletM">
                <FooterContent indent>
                  <DisclaimerLinks />
                </FooterContent>
              </FooterToggle>
              <FooterContent showAt="tabletM">
                <FooterHeading $as="h3">Disclaimer</FooterHeading>
                <DisclaimerLinks />
              </FooterContent>
            </React.Fragment>
          </Column>
        </Row>
      </FooterTop>

      {/* <div className="container-fluid footer-wrapper no-print">
        <div className="footer">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8">
          <footer className="footer-component">
            <h3 className="c-footer__heading">Disclaimer</h3>
            <ul>
              <li>Het register biedt geen compleet overzicht van alle slimme apparaten. Registratie van slimme apparaten in het register is niet verplicht, maar wordt wel gevraagd.</li>
              <li>De &#39;slimme apparaten&#39; in het register zijn van diverse organisaties.</li>
              <li>De gegevens van de eigenaar van het slimme apparaat worden niet getoond i.v.m. privacy.</li>
              <li>De eigenaar bepaalt of hij reageert; hij is dat niet verplicht.</li>
              <li>Uw mail wordt niet gearchiveerd in het register. Ook uw persoonlijke gegevens worden niet geregistreerd in het register.</li>
              <li>De gegevens van de apparaten in het register worden overgenomen van de eigenaar. Die is verantwoordelijk voor de juistheid en volledigheid van de gegevens.</li>
              <li>OIS, onderdeel van Gemeente Amsterdam, kan niet aansprakelijk worden gesteld voor de juistheid, volledigheid en actualiteit van de website. De Gemeente Amsterdam, OIS kan in het bijzonder niet aansprakelijk worden gesteld voor eventuele schade of consequenties ontstaan door direct of indirect gebruik van de inhoud van de website.</li>
            </ul>
          </footer>
        </div>
        </div>
      </div> */}
    </StyledFooter>
  );
}

export default Footer;
