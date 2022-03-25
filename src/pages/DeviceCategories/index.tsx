import styled from 'styled-components';
import { Accordion } from '@amsterdam/asc-ui';
import withContainer from '../withContainer';

const CategoryList = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  height: 95vh;
`;

const Categories = () => {
  return (
    <CategoryList>
      <h2>Type sensoren</h2>
      <p>
        Er zijn heel veel verschillende soorten sensoren. Om het Sensorenregister overzichtelijk te houden zijn sensoren
        onderverdeeld in de onderstaande hoofdcategorieën. In de lijst staan de meest voorkomende sensoren.
      </p>

      <Accordion id="one" title="Optische sensor / camera">
        <p>
          Optische sensoren staan ook wel bekend als fotocellen. Optische sensoren genereren licht (zender) en evalueren
          het gereflecteerde licht in de ontvanger opnieuw. Deze sensoren detecteren objecten en hun karakteristieken
          bijvoorbeeld door lichtonderbreking of verandering van de lichtintensiteit. In het dagelijks spraakgebruik
          wordt meestal niet over een “optische sensor” gesproken, maar over een camera. Een camera is dus een apparaat
          om foto's (fototoestel), filmopnamen (filmcamera) en video-opnamen (videocamera) te maken. In het geval van
          een camera worden altijd persoonsgegevens verwerkt, ook al is dat soms maar heel kort.
        </p>
        <p>Voorbeelden:</p>
        <ul>
          <li>CMOS-sensor</li>
          <li>Colorimeter</li>
          <li>Contact beeldsensor </li>
          <li>Elektro-optische sensor</li>
          <li>Vlam detector</li>
          <li>Infrarood sensor </li>
          <li>Kinetische inductantiedetector </li>
          <li>LED als lichtsensor</li>
          <li>Lichtadresseerbare potentiometrische sensor</li>
          <li>Nichols radiometer</li>
          <li>Vezeloptische sensoren</li>
          <li>Optische positiesensor</li>
          <li>Thermozuil lasersensoren</li>
          <li>Fotodetector</li>
          <li>Fotodiode </li>
          <li>Fotomultiplicator</li>
          <li>Fotomultiplicatorbuis</li>
          <li>Fototransistor </li>
          <li>Foto-elektrische sensor</li>
          <li>Foto-ionisatiedetector</li>
          <li>Fotomultiplicator</li>
          <li>Fotoweerstand</li>
          <li>Photoswitch</li>
          <li>Fototube</li>
          <li>Scintillometer</li>
          <li>Shack-Hartmann-golffrontsensor</li>
          <li>Lawinediode met één foton</li>
          <li>Supergeleidende nanodraad enkelfotondetector</li>
          <li>Overgangsrand sensor</li>
          <li>
            UV-sensor Een instrument dat gebruikt wordt om de intensiteit van ultraviolette (electromagnetische)
            straling te meten.{' '}
            <a href="https://wiki.seeedstudio.com/Grove-UV_Sensor/" target="_blank" rel="noreferrer">
              https://wiki.seeedstudio.com/Grove-UV_Sensor/
            </a>
          </li>
          <li>Zichtbaar licht foton-teller</li>
          <li>Wavefront-sensor</li>
        </ul>
      </Accordion>

      <Accordion title="Geluidsensor">
        <p>
          Een geluidsensor kan geluid of trillingen (geluidsgolven) detecteren op basis van geluidssterkte,
          trillingsterkte of trillingsfrequentie.
        </p>

        <p>Voorbeelden:</p>
        <ul>
          <li>Geofoon</li>
          <li>Hydrofoon</li>
          <li>Microfoon</li>
          <li>Seismometer</li>
          <li>
            Geluidsmeter Een meetinstrument om het geluidsniveau te meten.
            <a href="https://nl.wikipedia.org/wiki/Geluidsniveaumeter" target="_blank" rel="noreferrer">
              https://nl.wikipedia.org/wiki/Geluidsniveaumeter
            </a>{' '}
          </li>
          <li>Geluidszoeker</li>
        </ul>
      </Accordion>

      <Accordion title="Chemiesensor">
        <p>Een chemiesensor kan verschillende of specifieke chemische samenstellingen van stoffen meten.</p>

        <p>Voorbeelden:</p>
        <ul>
          <li>Kooldioxide-sensor</li>
          <li>Koolmonoxidedetector</li>
          <li>Katalytische parelsensor</li>
          <li>Chemische veldeffecttransistor </li>
          <li>Chemiresistor</li>
          <li>Elektrochemische gassensor</li>
          <li>Elektronische neus</li>
          <li>Elektrolytisolator - halfgeleidersensor</li>
          <li>Energiedispersieve röntgenspectroscopie</li>
          <li>Fluorescerende chloride-sensoren </li>
          <li>Holografische sensor</li>
          <li>Koolwaterstof dauwpuntanalysator</li>
          <li>Waterstofsensor</li>
          <li>Waterstofsulfide-sensor</li>
          <li>Infrarood puntsensor</li>
          <li>Ionselectieve elektrode</li>
          <li>ISFET</li>
          <li>Niet-dispersieve infraroodsensor</li>
          <li>Microgolfchemiesensor</li>
          <li>Stikstofoxide sensor</li>
          <li>Niet-dispersieve infraroodsensor </li>
          <li>Olfactometer</li>
          <li>Optode</li>
          <li>Zuurstof sensor</li>
          <li>Ozon-monitor</li>
          <li>Pellistor</li>
          <li>pH-glaselektrode</li>
          <li>Potentiometrische sensor</li>
          <li>Redox-elektrode</li>
          <li>
            Rookdetector Een detector die alarm slaat na waarnemen van rookdeeltjes (aerosolen), die kunnen wijzen op
            een (beginnende) brand.{' '}
            <a href="https://nl.wikipedia.org/wiki/Rookmelder" target="_blank" rel="noreferrer">
              https://nl.wikipedia.org/wiki/Rookmelder
            </a>
          </li>
          <li>Zinkoxide nanostaaf sensor</li>
        </ul>
      </Accordion>

      <Accordion title="Elektriciteitssensor">
        <p>Een elektriciteitssensor kan verschillende vormen van elektriciteit en elektromagnetische golven meten.</p>

        <p>Voorbeelden:</p>
        <ul>
          <li>Stroomsensor</li>
          <li>Daly-detector</li>
          <li>Elektroscoop</li>
          <li>Elektronenvermenigvuldiger</li>
          <li>Faraday beker</li>
          <li>Galvanometer</li>
          <li>Hall-effect sensor</li>
          <li>Hall-sonde</li>
          <li>Magnetische afwijkingsdetector</li>
          <li>Magnetometer</li>
          <li>Magnetoweerstand</li>
          <li>MEMS magnetische veldsensor</li>
          <li>Metaaldetector</li>
          <li>Planar Hall-sensor</li>
          <li>Radiorichtingzoeker</li>
          <li>Spanningsdetector</li>
        </ul>
      </Accordion>

      <Accordion title="Klimaatsensor">
        <p>
          Het gaat hierbij om een verzameling instrumenten die het weer kunnen meten. Een klimaatsensor kan dus
          verschillende of specifieke klimaataspecten meten; hierbij is in de sensor zelf uiteraard sprake van een
          momentopname.
        </p>

        <p>Voorbeelden:</p>
        <ul>
          <li>Actinometer</li>
          <li>Luchtvervuilingssensor</li>
          <li>Plafondmeter</li>
          <li>Dauw waarschuwing</li>
          <li>Elektrochemische gassensor</li>
          <li>Visteller</li>
          <li>Frequentiedomeinsensor</li>
          <li>Gas detector</li>
          <li>Hook gauge verdampingsmeter</li>
          <li>Humistor</li>
          <li>Hygrometer</li>
          <li>Blad sensor</li>
          <li>Lysimeter</li>
          <li>Pyranometer</li>
          <li>Pyrgeometer</li>
          <li>Psychrometer</li>
          <li>Regenmeter</li>
          <li>Regensensor</li>
          <li>Seismometer</li>
          <li>SNOTEL</li>
          <li>Sneeuwmeter</li>
          <li>Bodemvochtsensor</li>
          <li>Stroommeter</li>
          <li>Getijdenmeter</li>
          <li>Weerradar</li>
        </ul>
      </Accordion>

      <Accordion title="Vloeistof- en gaststroomsensor">
        <p>
          Een meetinstrument waarmee de doorstroming (als massa of volume) van een gas of vloeistof per tijdseenheid
          (het debiet) gemeten kan worden.
        </p>

        <p>Voorbeelden:</p>
        <ul>
          <li>Luchtstroommeter</li>
          <li>Anemometer</li>
          <li>Stroomsensor</li>
          <li>Gas meter</li>
          <li>Massastroomsensor</li>
          <li>Watermeter</li>
        </ul>
      </Accordion>

      <Accordion title="Positie- of verplaatsingssensor">
        <p>Een positie- of verplaatsingssensor kan de positie of locatie van mensen en/of objecten meten.</p>

        <p>Voorbeelden:</p>
        <ul>
          <li>Versnellingsmeter</li>
          <li>Auxanometer</li>
          <li>Capacitieve verplaatsingssensor</li>
          <li>Capacitieve detectie</li>
          <li>
            Detectielus Een inductielus van koperdraad verzonken in het wegdek, waarmee met behulp van elektronica een
            voertuig kan worden waargenomen.{' '}
            <a href="https://nl.wikipedia.org/wiki/Detectielus" target="_blank" rel="noreferrer">
              https://nl.wikipedia.org/wiki/Detectielus
            </a>
          </li>
          <li>Flex-sensor</li>
          <li>Vrije val sensor</li>
          <li>Gravimeter</li>
          <li>Gyroscopische sensor</li>
          <li>Hoogte sensor</li>
          <li>Impact sensor</li>
          <li>Hellingsmeter</li>
          <li>Incrementele encoder</li>
          <li>Piëzo-elektrische sensor met geïntegreerde schakeling</li>
          <li>Laser afstandsmeter</li>
          <li>Laser oppervlaktesnelheidsmeter</li>
          <li>LIDAR</li>
          <li>Lineaire encoder</li>
          <li>Lineaire variabele differentiële transformator (LVDT)</li>
          <li>Vloeibare capacitieve inclinometers</li>
          <li>Kilometerteller</li>
          <li>Foto-elektrische sensor</li>
          <li>Piëzo-elektrische versnellingsmeter</li>
          <li>Positiesensor</li>
          <li>Positiegevoelig apparaat</li>
          <li>Hoeksensor</li>
          <li>Draaiknop</li>
          <li>Roterende variabele differentiële transformator</li>
          <li>Selsyn</li>
          <li>Schokdetector</li>
          <li>Datalogger voor schokken</li>
          <li>
            SpeedDetectionDevice Een apparaat dat snelheidsovertredingen in het verkeer of het door een rood
            verkeerslicht rijden kan vaststellen.{' '}
            <a href="https://nl.wikipedia.org/wiki/Flitspaal" target="_blank" rel="noreferrer">
              https://nl.wikipedia.org/wiki/Flitspaal
            </a>
          </li>
          <li>Plotselinge bewegingssensor</li>
          <li>Kantel sensor</li>
          <li>Toerenteller</li>
          <li>Ultrasone diktemeter</li>
          <li>Ultrabreedbandradar</li>
          <li>Variabele reluctantiesensor</li>
          <li>Snelheidsontvanger</li>
        </ul>
      </Accordion>

      <Accordion title="Druksensor">
        <p>
          Een druksensor is een meetinstrument voor het meten van de druk van gassen of vloeistoffen. Druk is een
          uitdrukking van de kracht die nodig is om de expansie van een vloeistof te stoppen en wordt meestal uitgedrukt
          in kracht per oppervlakte-eenheid.
        </p>

        <p>Voorbeelden:</p>
        <ul>
          <li>Barograaf</li>
          <li>Barometer</li>
          <li>Bourdonmeter</li>
          <li>Heet filament ionisatie meter</li>
          <li>Ionisatiemeter</li>
          <li>McLeod-meter</li>
          <li>Oscillerende U-buis</li>
          <li>Piëzometer</li>
          <li>Pirani-meter</li>
          <li>Druksensor</li>
          <li>Drukmeter</li>
          <li>Tastsensor</li>
          <li>Tijd manometer</li>
        </ul>
      </Accordion>

      <Accordion title="Dichtheidsensor">
        <p>Een dichtheidsensor kan de dichtheid van stoffen meten.</p>

        <p>Voorbeelden:</p>
        <li>Bhangmeter</li>
        <li>Hydrometer</li>
        <li>Krachtmeter/-sensor</li>
        <li>Niveausensor</li>
        <li>Magnetische niveaumeter</li>
        <li>Piëzocapacitieve druksensor</li>
        <li>Piëzo-elektrische sensor</li>
        <li>Spanningsmeter</li>
        <li>Koppel sensor</li>
        <li>Viscometer</li>
      </Accordion>

      <Accordion title="Temperatuursensor">
        <p>Een temperatuur- of energiesensor kan verschillende of specifieke vormen van energiestraling meten.</p>

        <p>Voorbeelden:</p>
        <ul>
          <li>Bolometer</li>
          <li>Vlamdetectie</li>
          <li>Gardon-meter</li>
          <li>Golay-cel</li>
          <li>Warmtefluxsensor</li>
          <li>Infrarood thermometer</li>
          <li>Microgolfmeter</li>
          <li>Netto radiometer</li>
          <li>Kwarts thermometer</li>
          <li>Weerstandsthermometer</li>
          <li>Silicium bandgap temperatuursensor</li>
          <li>Speciale sensor microgolf / imager</li>
          <li>Temperatuurmeter</li>
          <li>Thermistor</li>
          <li>Thermokoppel</li>
          <li>Thermometer</li>
          <li>Pyrometer</li>
        </ul>
      </Accordion>

      <Accordion title="Aanwezigheid of nabijheidsensor">
        <p>Een aanwezigheid of nabijheidsensor kan de aanwezigheid of nabijheid van mensen en/of objecten meten.</p>
        <p>Voorbeelden:</p>
        <ul>
          <li>Alarmsensor</li>
          <li>Doppler-radar</li>
          <li>
            Bewegingsdetector Een apparaat dat door middel van ultrageluid, of door elektromagnetische straling, zoals
            microgolven of infrarode straling, beweging detecteert.{' '}
            <a href="https://nl.wikipedia.org/wiki/Bewegingssensor" target="_blank" rel="noreferrer">
              https://nl.wikipedia.org/wiki/Bewegingssensor
            </a>
          </li>
          <li>Aanwezigheidssensor</li>
          <li>Nabijheidssensor</li>
          <li>Passieve infraroodsensor</li>
          <li>Reed-schakelaar</li>
          <li>Stud finder</li>
          <li>Triangulatie sensor</li>
          <li>Touch schakelaar</li>
          <li>BioFET</li>
          <li>Biochip</li>
          <li>Biosensor</li>
          <li>Capaciteit sonde</li>
          <li>Capaciteitssensor</li>
          <li>Catadioptrische sensor</li>
          <li>Koolstofpasta-elektrode</li>
          <li>Digitale sensoren</li>
          <li>Verplaatsingsontvanger</li>
          <li>Elektromechanische film</li>
          <li>Elektro-optische sensor</li>
          <li>Elektrochemische vermoeidheidsscheursensor</li>
          <li>Fabry-Pérot-interferometer</li>
          <li>Akoestiek in de visserij</li>
          <li>Beeldsensor</li>
          <li>Formaat beeldsensor</li>
          <li>Inductie sensor</li>
          <li>Intelligente sensor</li>
          <li>Lab-op-een-chip</li>
          <li>Blad sensor</li>
          <li>Machine visie</li>
          <li>Micro-elektromechanische systemen</li>
          <li>MOSFET</li>
          <li>Foto-elasticiteit</li>
          <li>Quantumsensor</li>
          <li>Radar</li>
          <li>Gronddoordringende radar</li>
          <li>Synthetische diafragma-radar</li>
          <li>Radartracker</li>
          <li>Uitrekbare sensor</li>
          <li>Sensorreeks</li>
          <li>Sensor fusie</li>
          <li>Sensor rooster</li>
          <li>Sensorknooppunt</li>
          <li>Zachte sensor</li>
          <li>Sonar</li>
          <li>Starende array</li>
          <li>Omvormer</li>
          <li>Ultrasoon sensor</li>
          <li>Videosensor</li>
          <li>Visueel sensornetwerk</li>
          <li>Wheatstone-brug</li>
          <li>Draadloos sensornetwerk</li>
        </ul>
      </Accordion>
    </CategoryList>
  );
};

export default withContainer(Categories);
