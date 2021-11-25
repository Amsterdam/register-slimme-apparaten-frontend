import React from 'react';

import { AccordionWrapper, Accordion } from '@amsterdam/asc-ui';

import './style.scss';

const FAQ = () => (
  <div className="faq-content">
    <h2>Veelgestelde vragen (FAQ)</h2>
    <AccordionWrapper>
      <Accordion title="Wat verstaan jullie onder een sensor?">
        Voor de meldingsplicht sensoren verstaat de gemeente Amsterdam onder een sensor: een kunstmatig zintuig dat
        wordt ingezet of kan worden ingezet om waarnemingen te doen en deze digitaal te verwerken of te laten verwerken.
      </Accordion>

      <Accordion title="Waarom staan er maar zo weinig verschillende soorten sensoren in het register? Er zijn toch veel meer soorten?">
        Om het register overzichtelijk te houden, hebben we op dit moment gekozen voor een onderverdeling in
        hoofdcategorieën van sensoren. Deze verdeling kan op een later moment worden aangepast, mocht dat nodig zijn.
      </Accordion>

      <Accordion title="Waar kan ik de tekst van de verordening meldingsplicht sensoren vinden?">
        De{' '}
        <a href="https://zoek.officielebekendmakingen.nl/gmb-2021-368183.html">
          tekst van de verordening kunt u vinden via deze link
        </a>
        .
      </Accordion>

      <Accordion title="Wat is het verschil tussen een camera en een sensor?">
        Alle camera’s zijn sensoren, namelijk optische sensoren. In het spraakgebruik wordt echter meestal het woord
        “camera” gebruikt. Behalve camera’s (optische sensoren) zijn er dus nog heel veel andere soorten sensoren, denk
        aan wifisensoren, geluidssensoren of sensoren voor luchtkwaliteit.
      </Accordion>
    </AccordionWrapper>
  </div>
);

export default FAQ;
