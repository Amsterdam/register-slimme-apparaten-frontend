import React from 'react';

import './style.scss';

function Footer() {
  return (
    <div className="footer-wrapper no-print">
      <div className="row bg-darkgrey footer">
        <footer className="footer-component">
          <h3 className="c-footer__heading">Disclaimer</h3>
          <ul>
            <li>Het register is niet volledig. Registratie van slimme apparaten in het register is niet verplicht.</li>
            <li>De gegevens over slimme apparaten in het register worden overgenomen van de eigenaar. Deze is verantwoordelijk voor de juistheid en volledigheid van de gegevens.</li>
            <li>De maker van de software, OIS van de gemeente Amsterdam is niet verantwoordelijk voor de kwaliteit en de inhoud van het register.</li>
            <li>De Gemeente Amsterdam, OIS kan echter niet aansprakelijk worden gesteld voor de juistheid, volledigheid en actualiteit van de website. De Gemeente Amsterdam, OIS kan in het bijzonder niet aansprakelijk worden gesteld voor eventuele schade of consequenties ontstaan door direct of indirect gebruik van de inhoud van de website.</li>
            <li>Meer informatie over de privacyvoorwaarden kunt u hier vinden: <a href="https://www.amsterdam.nl/privacy/privacyverklaring/" target="_blank">Privacyverklaring gemeente Amsterdam</a></li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
