const ICON_PATH = 'assets/';

export const CAMERA_TOEZICHTSGEBIED = 'Camera-toezichtsgebied';


const categories = {
  [CAMERA_TOEZICHTSGEBIED]: {
    iconUrl: `${ICON_PATH}icon-camera-gebied@3x.png`,
    name: 'Camera toezichtsgebied',
    enabled: true
  },
  'Camera': { // eslint-disable-line quote-props
    isClustered: true,
    iconUrl: `${ICON_PATH}icon-camera@3x.png`,
    name: 'Camera',
    enabled: true,
    description: 'Een camera neemt beelden waar en houdt die niet persé vast. Bijvoorbeeld: een fotocamera legt beelden vast; een camera om aantallen vervoersmiddelen te tellen, neemt waar, telt en legt de beelden niet persé vast. De technologie gaat zo snel vooruit dat er inmiddels camera’s zijn voor gezichtsherkenning die in staat zijn op basis van een combinatie van getallen te zoeken naar specifieke gezichten, bijvoorbeeld van een crimineel, zonder andere gezichten te herkennen en vast te leggen.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Camera',
    wikipediaDescription: 'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both. The images may be individual still photographs or sequences of images constituting videos or movies. The camera is a remote sensing device as it senses subjects without any contact . The word camera comes from camera obscura, which means "dark chamber" and is the Latin name of the original device for projecting an image of external reality onto a flat surface. The modern photographic camera evolved from the camera obscura. The functioning of the camera is very similar to the functioning of the human eye. The first permanent photograph was made in 1826 by Joseph Nicéphore Niépce.',
    subtypes: [
      'Telcamera',
      'Kentekenherkenning',
      'Beeld'
    ]
  },
  'Sensor': { // eslint-disable-line quote-props
    isClustered: true,
    iconUrl: `${ICON_PATH}icon-sensor@3x.png`,
    name: 'Sensor',
    enabled: true,
    description: 'Een sensor verzamelt data over een specifiek onderwerp, bijvoorbeeld luchtkwaliteit, geluid, de vulling van een afvalcontainer. Deze data wordt verstuurd naar een plek waar deze verwerkt wordt, bijvoorbeeld tot een grafiek waarin aangegeven hoe vol een container is of een programma dat een signaal afgeeft wanneer de container 80% gevuld is zodat deze wordt opgenomen in de eerstvolgende route van een auto om de container te legen.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sensor',
    wikipediaDescription: 'In the broadest definition, a sensor is a device, module, or subsystem whose purpose is to detect events or changes in its environment and send the information to other electronics, frequently a computer processor. A sensor is always used with other electronics, whether as simple as a light or as complex as a computer.',
    subtypes: [
      'Luchtkwaliteit',
      'Vervoerstromen (aantal vervoermiddelen)',
      'Geluid'
    ]
  },
  'Baken': { // eslint-disable-line quote-props
    isClustered: true,
    iconUrl: `${ICON_PATH}icon-beacon@3x.png`,
    name: 'Beacon',
    enabled: true,
    description: 'Beacons of bakens zijn kleine zenders die een verbinding maken via Bluetooth met smartphones. Zij worden meestal gebruikt om informatie te verschaffen over bijvoorbeeld rijtijden Openbaar Vervoer (hoe lang tot de volgende tram of bus), over routes e.d. Ook worden ze gebruikt voor marketing doeleinden. Er worden boodschappen verstuurd naar de smartphone om je naar een winkel te lokken die in de buurt is.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Bluetooth_low_energy_beacon',
    wikipediaDescription: 'A beacon is an intentionally conspicuous device designed to attract attention to a specific location.',
    subtypes: []
  },
  'Slimme verkeersinformatie': {
    isClustered: true,
    iconUrl: `${ICON_PATH}icon-verkeer@3x.png`,
    name: 'Slimme verkeersinformatie',
    enabled: true,
    description: 'De ‘slimme’ systemen voor verkeersinformatie geven informatie op basis van elektronische ‘waarnemingen’, bijvoorbeeld het aantal voertuigen, of het weer. Er zijn bijvoorbeeld stoplichten die langer groen blijven voor fietsen als het regent, of die op groen gaan als een vervoermiddel nadert terwijl de andere wegen geen verkeer hebben. Er zijn nog meer mogelijkheden voor verkeersmanagement, bijvoorbeeld op basis van sensoren en meetpunten in het wegdek en rondom de weg. In het artikel <a href="http://verkeer.wikia.com/wiki/Meetsystemen" target="_blank">http://verkeer.wikia.com/wiki/Meetsystemen</a> worden weggebonden en voertuiggebonden meetsystemen toegelicht. Verkeersgegevens kunnen voor uiteenlopende toepassingen worden gebruikt, zoals <a href="http://verkeer.wikia.com/wiki/Verkeersmonitoring_voor_Dynamisch_Verkeersmanagement" target="_blank">dynamisch verkeersmanagement</a>, <a href="http://verkeer.wikia.com/wiki/Verkeersmonitoring_voor_ontwikkeling_en_evaluatie_van_maatregelen" target="_blank">evaluatie van maatregelen</a>, <a href="http://verkeer.wikia.com/wiki/Verkeersmonitoring_voor_Beleid" target="_blank">opstellen van beleid</a>, <a href="http://verkeer.wikia.com/wiki/Verkeersmonitoring_voor_actuele_verkeersinformatie" target="_blank">verkeersinformatie</a> of <a href="http://verkeer.wikia.com/wiki/Verkeersmonitoring_voor_Onderzoek" target="_blank">onderzoek</a>. Er zijn verschillende monitoringssystemen om gegevens over verkeerssituaties in te winnen.',
    wikipediaUrl: '',
    wikipediaDescription: '',
    subtypes: [
      'Slimme verkeerslichten: reageert op de omgeving op basis van verzamelde data, bijvoorbeeld over het weer of het aantal vervoermiddelen.',
      'DRIPs: één van de mogelijkheden om van borden informatie te geven aan verkeersdeelnemers. De informatie op de borden kan aangestuurd worden vanuit een centraal punt en op basis van sensoren en/of bakens. Als dat laatste gebeurt, wordt de DRIP opgenomen in het register.'
    ]
  },
  'Slimme laadpaal': {
    isClustered: true,
    iconUrl: `${ICON_PATH}icon-laadpaal@3x.png`,
    name: 'Slimme laadpaal',
    enabled: true,
    description: 'Met een slimme laadpaal is het mogelijk een goede administratie bij te houden en automatisch rekeningen te vereffenen. Dit is van belang als een elektrische auto niet alleen wordt gebruikt om mee te rijden, maar ook als een batterij wanneer die stil staat. Deze paal neemt geen data op uit de omgeving, met uitzondering van data over energiestromen naar en van de auto. Het is denkbaar dat slimme laadpalen in de toekomst ook gebruikt worden om metingen te verrichten. Zover bekend, is dat nu nog niet het geval.',
    wikipediaUrl: '',
    wikipediaDescription: '',
    subtypes: []
  },
  'Slimme lantaarnpaal': {
    isClustered: true,
    iconUrl: `${ICON_PATH}icon-lantaarn@3x.png`,
    name: 'Slimme lantaarnpaal',
    enabled: true,
    description: 'We kennen allemaal de lantaarnpalen. Deze geven licht, ook als het niet nodig is. Slimme lantaarnpalen passen het lichtniveau aan, aan wat nodig is, omdat een vervoermiddel of persoon langskomt. Deze palen kunnen ook uitgerust worden met sensoren die de luchtkwaliteit of het geluidsniveau meten. Ook kan de lantaarnpaal dienen als oplaadpunt voor elektrische auto\'s, of dienst doen als opstelplek voor een stadsbreed Wi-Fi netwerk.',
    wikipediaUrl: '',
    wikipediaDescription: '',
    subtypes: []
  }
};

export default categories;
