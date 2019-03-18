import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';

function About() {
  return (
    <Fragment>
      <header className="modal-header">
        <h3>Over dit register</h3>
      </header>

      <section className="modal-body">
        <NavLink to="/about/faq" className="link-faq">Veelgestelde vragen (FAQ)</NavLink>

        <h4>Puntsgewijs wordt toegelicht:</h4>
        <ul>
          <li>Wat het &#39;Register slimme apparaten&#39; is</li>
          <li>Beta status register</li>
          <li>Beschikbaarheid data in het register</li>
          <li>Als er data niet klopt of mist naar uw mening</li>
          <li>Hergebruik data</li>
          <li>Verantwoordelijkheid gemeente Amsterdam en eigenaren van de data in het register slimme apparaten</li>
          <li>Aansprakelijkheid gemeente Amsterdam</li>
        </ul>

        <h4>Wat het &#39;Register slimme apparaten&#39; is</h4>
        <p>We maken steeds meer gebruik van apps, digitale diensten, op onze smartphone en tablet om een restaurant te reserveren, te kijken naar de weersvoorspellingen, de rijtijden van het Openbaar Vervoer, om te betalen e.d. Er zijn ook digitale diensten om verkeersstromen te regelen op weg en water, om de weg te wijzen en routes te adviseren op een festival en in de stad. Deze digitale diensten verzamelen data in de openbare ruimte. Dat doen ze door &#39;slimme apparaten&#39; te gebruiken. &#39;Slimme apparaten&#39; is de verzameling apparaten waarmee data wordt verzameld en gegevens in de openbare ruimte. Onder meer: slimme laadpalen, sensoren, slimme camera&#39;s voor o.a. het tellen van aantallen voetgangers of vervoermiddelen; voor kenteken- of gezichtsherkenning. De slimme apparaten vallen lang niet altijd op. Omdat ze data verzamelen over onze omgeving en soms over &#39;ons&#39;, vindt de gemeente Amsterdam het belangrijk dat er een openbaar register komt waarin bewoners en ondernemers kunnen zien welke &#39;slimme apparaten&#39; aanwezig zijn in de openbare ruimte van de stad, waar en welke data deze verzamelen. Het doel van het &#39;register slimme apparaten&#39; is:</p>
        <ul>
          <li>Voor bewoners: transparantie zodat zij weten welke slimme apparaten er zijn en welk type data in welke gebieden verzameld wordt.</li>
          <li>Voor ondernemers, klein en groot: de gelegenheid om na te gaan of er al data verzameld wordt die men mogelijk kan gebruiken voor de dienst die zij (willen gaan) aanbieden.</li>
        </ul>
        <p>In het &#39;Register slimme apparaten&#39; worden de aanwezige  slimme apparaten in de openbare ruimte op een kaart weergegeven. Van elk apparaat wordt aangegeven wat het is. Daardoor is ook bekend welk type data verzameld wordt. Bijvoorbeeld: een sensor luchtkwaliteit verzamelt data over de luchtkwaliteit; een camera om gezichten te herkennen, doet dat. Een camera die verkeer telt, neemt geen beelden op. Van elk slim apparaat is de eigenaar bekend. Hoewel de naam niet wordt aangegeven omwille van privacy redenen, kan de eigenaar wel gemaild worden, bijvoorbeeld om meer informatie op te vragen of om te vragen of de data gebruikt mogen worden. Het is aan de eigenaar of deze reageert en, zo ja: hoe. Het register is niet meer dan een weergave met de mogelijkheid tot contact over slimme apparaten in de openbare ruimte. Het register is niet volledig. De ontwikkelingen gaan zo snel dat die niet bij te houden zijn.</p>
        <p>Het &#39;Register slimme apparaten&#39; is een samenwerking van de gemeente Amsterdam in samenwerking met Alliander, Johan Cruijff Arena, Politie, Vervoersregio en Waternet.</p>

        <h4>Beta status register</h4>
        <p>Het &#39;Register slimme apparaten&#39; is een &#39;beta&#39; versie. Dit houdt in dat we aan het testen zijn en er continue verbeteringen gemaakt worden. Heeft u feedback, dan horen we graag van u. Hierbij worden geen persoonsgegevens verzameld.</p>

        <h4>Beschikbaarheid data in het register</h4>
        <p>De gebruikers kunnen geen aanspraak maken op de ter beschikking stelling van data. De Gemeente Amsterdam en haar partners hebben ten alle tijde het recht om de datasets aan te passen, de datasets niet langer beschikbaar te stellen of de toegang daartoe anderszins op te schorten, zonder dat daarvoor een overgangstermijn in acht wordt genomen en zonder dat gebruikers daarvan persoonlijk op de hoogte worden gesteld.</p>

        <h4>Als er iets niet klopt of mist naar uw mening</h4>
        <p>Komt u iets tegen dat niet correct is of verouderd is, dan stellen wij het op prijs als u ons dat laat weten door contact op te nemen. Of u kunt ter zake bezwaar maken via de volgende link.</p>

        <h4>Hergebruik data register</h4>
        <p>Bij hergebruik van de inhoud van de datasets is bronvermelding niet verplicht. Maar bij het citeren van de inhoud mag niet de indruk worden gewekt dat de gemeente en/of haar partners de strekking van het afgeleide werk onderschrijft.</p>

        <h4>Verantwoordelijkheid gemeente Amsterdam en eigenaren van de data voor data in het register slimme apparaten</h4>
        <p>Het &#39;Register slimme apparaten&#39; komt tot stand onder verantwoordelijkheid van de gemeente Amsterdam. De gemeente Amsterdam en haar partners besteden de grootst mogelijk zorg aan het samenstellen van de inhoud van de datasets. Maar dit is geen garantie dat deze datasets volledig, accuraat, up-to-date en juist zijn.</p>

        <h4>Aansprakelijkheid gemeente Amsterdam</h4>
        <p>De gemeente Amsterdam en haar partners sluiten iedere aansprakelijkheid uit voor welke schade (direct en/of indirecte schade) dan ook, op enige wijze ontstaan door en/of voortvloeiend uit elk gebruik van deze datasets, waaronder ook – maar niet alleen – handelingen van een gebruiker van de datasets die zouden zijn ingegeven door ter beschikking gestelde data.</p>
      </section>
    </Fragment>
  );
}

export default About;
