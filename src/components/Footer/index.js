import React from 'react';

import './style.scss';

function Footer() {
  return (
    <div className="footer-wrapper no-print">
      <div className="row bg-darkgrey footer">
        <footer className="footer-component">
          <h3 className="c-footer__heading">Disclaimer</h3>
          <span className="u-mb--1">
            Register IoT is gemaakt door De Gemeente Amsterdam, OIS.
          </span>
          <p className="u-mb--1">
            De inhoud van Register IoT is met uiterste zorgvuldigheid tot stand gebracht. De inhoud wordt regelmatig gecontroleerd en geactualiseerd.
          </p>
          <p className="u-mb--1">
            De Gemeente Amsterdam, OIS kan echter niet aansprakelijk worden gesteld voor de juistheid, volledigheid en actualiteit van de website. De Gemeente Amsterdam, OIS kan in het bijzonder niet aansprakelijk worden gesteld voor eventuele schade of consequenties ontstaan door direct of indirect gebruik van de inhoud van de website.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
