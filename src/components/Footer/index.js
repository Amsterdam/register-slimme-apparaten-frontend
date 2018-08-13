import React from 'react';

import './style.scss';

function Footer() {
  return (
    <div className="footer-wrapper no-print">
      <div className="row bg-darkgrey footer">
        <footer className="container footer-component">
          <div className="row">
            <div className="col-12">
              <h3 className="c-footer__heading">Contact</h3>
              <p className="u-mb--1">
                Heeft u een vraag over de informatie die u aantreft op Mijn Amsterdam?<br />
                Neem dan contact op met de gemeente.
              </p>

              <p className="u-mb--1">
                Gemeentelijk informatienummer: <a href="tel:14020" className="c-link c-link--inherit">14 020</a><br />
                op werkdagen van 08:00 tot 18:00 uur.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <div className="container grid-below-footer">
        <div className="row">
          <div className="col-12">
            <nav>
              <ul className="links horizontal left">
                <li>
                  <a href="https://www.amsterdam.nl/privacy/">
                    <span className="linklabel">
                      Privacy
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
