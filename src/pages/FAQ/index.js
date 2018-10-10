import React from 'react';

import Accordion from 'components/Accordion';

import './style.scss';

function FAQ() {
  return (
    <div className="faq-content">
      <h2>Veelgestelde vragen (FAQ)</h2>

      <Accordion title="Waarom een register voor slimme apparaten?">
        <div>Het ‘register slimme apparaten’ is een online register (kaart) welk laat zien waar data en andere gegevens worden verzamelen in de openbare ruimte. Denk aan onder meer laadpalen, sensoren, camera’s voor het tellen van aantallen voetgangers of vervoermiddelen; voor kenteken- of gezichtsherkenning. Deze slimme apparaten vallen lang niet altijd op. Omdat ze data verzamelen over onze omgeving, en soms over ‘ons’, vindt de gemeente Amsterdam het belangrijk op hier transparantie in te bieden aan bewoners en ondernemers.  Waar zijn ‘slimme apparaten’ aanwezig in de openbare ruimte van de stad, waar en welke data verzamelen deze?
          Het doel van het ‘register slimme apparaten’ is:
          <ul>
            <li>Voor bewoners: transparantie zodat zij weten welke slimme apparaten er zijn en welk type data in welke gebieden verzameld wordt.</li>
            <li>Voor ondernemers, klein en groot, de gelegenheid om na te gaan of er al data verzameld wordt die men mogelijk kan gebruiken voor de dienst die zij (willen gaan) aanbieden.</li>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Wat zijn slimme apparaten?">
        <div>‘Slimme apparaten’ is de verzameling apparaten waarmee data wordt verzameld en gegeven in de openbare ruimte. Onder meer: slimme laadpalen, sensoren, slimme camera’s voor o.a. het tellen van aantallen voetgangers of vervoermiddelen; voor kenteken- of voor gezichtsherkenning. De slimme apparaten vallen niet altijd op.</div>
      </Accordion>

      <Accordion title="Wat voor data wordt verzameld door slimme apparaten?">
        <div>Er wordt niet altijd data verzameld, er wordt ook data ‘uitgezonden’, bijvoorbeeld door beacons (ook bakens genoemd). Beacons of bakens zijn kleine zenders die een verbinding maken via Bluetooth met smartphones. Zij worden meestal gebruikt om informatie te verschaffen over bijvoorbeeld rijtijden Openbaar Vervoer. Over wanneer de volgende tram of bus aan komt of over een aanbod van een nabije winkel. Als er data verzameld wordt is dat soms over de omgeving, zoals geluid of luchtkwaliteit, over het aantal vervoermiddelen of mensen, over het weer e.d. Ook beelden worden verzameld, zij het dat die niet altijd worden vastgelegd.</div>
      </Accordion>

      <Accordion title="Van wie is het register?">
        <div>Het register is van ons allemaal. De gemeente Amsterdam zorgt er voor dat het register er is. De eigenaren van de slimme apparaten zijn er voor verantwoordelijk dat de informatie over hun slimme apparaten in het register aanwezig is.</div>
      </Accordion>

      <Accordion title="Hoe kan het dat ik een slim apparaat niet kan vinden in het register?">
        <div>Het kan zo zijn dat een slim apparaat niet in het register staat. Dit kan zijn omdat:
          <ol>
            <li>we zijn net begonnen met het register (eind 2018). Verwacht wordt dat het enige tijd kost om een redelijke vulling te krijgen.</li>
            <li>de registratie van slimme apparaten in het register (nog) niet verplicht is. De komende periode wordt nagegaan of eigenaren bereid zijn hun slimme apparaten te registreren zonder dwang.</li>
          </ol>
        </div>
      </Accordion>

      <Accordion title="Wat moet ik doen als de informatie over een slim apparaat volgens mij niet klopt?">
        <div>Die kunt u melden via het mailformulier aan de eigenaar van het slimme apparaat. Die is verantwoordelijk voor de juistheid en de volledigheid van de informatie.</div>
      </Accordion>

      <Accordion title="Hoe moet ik een slim apparaat invoeren?">
        <div></div>
      </Accordion>

      <Accordion title="Wat zie ik op de kaart van het register?">
        <div>Op de kaart ziet u blauwe stippen. Zoek de blauwe stippen die het dichtst bij de buurt zijn waarvoor u wilt weten welke slimme apparaten er zijn. Klik dan op een blauwe stip. U krijgt een meer gedetailleerde kaart te zien, waarop is aangegeven welke slimme apparaten er zijn. De kleur van de stip geeft aan welke categorie slim apparaat het is: camera, sensor ed. Wilt u er meer weten? Klik dan op die stip.</div>
      </Accordion>

      <Accordion title="Hoe stuur ik een mail naar de eigenaar van een slim apparaat?">
        <div>Dat kunt u doen als u het slimme apparaat waarover u een mail wilt sturen hebt gevonden op de kaart. In het tabel rechts met informatie over het slimme apparaat, is een knop om een mail te sturen naar de eigenaar van het slimme apparaat.</div>
      </Accordion>

      <Accordion title="Hoe vind ik een slim apparaat?">
        <div>Als u wilt weten welke slimme apparaten aanwezig zijn in een straat: ga naar het deel van de kaart waar de straat zich bevindt en klik op de dichtstbijzijnde blauwe stip. Dan kijkt u op de straat waar het slimme apparaat dat u zoekt is. Door op de aanwezige stippen te klikken ziet u informatie (rechts) verschijnen. Daarmee kunt u nagaan of dit het apparaat is wat u zocht. Het kan ook zo zijn dat het apparaat niet geregistreerd is. In dat geval kan het register u niet helpen.</div>
      </Accordion>
    </div>
  );
}

export default FAQ;
