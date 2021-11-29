const ICON_PATH = 'assets/';

export const CATEGORY_NAMES = {
  CAMERA: 'Camera',
  SENSOR: 'Sensor',
};

export const DISPLAY_NAMES = {
  ...CATEGORY_NAMES,
  BEACONS: 'Beacons',
};

export const categories = {
  [CATEGORY_NAMES.CAMERA]: {
    isClustered: false,
    iconUrl: `${ICON_PATH}icon-camera@3x.png`,
    name: DISPLAY_NAMES.CAMERA,
    enabled: true,
    description:
      'Een camera neemt beelden waar en houdt die niet persé vast. Bijvoorbeeld: een fotocamera legt beelden vast; een camera om aantallen vervoersmiddelen te tellen, neemt waar, telt en legt de beelden niet persé vast. De technologie gaat zo snel vooruit dat er inmiddels camera’s zijn voor gezichtsherkenning die in staat zijn op basis van een combinatie van getallen te zoeken naar specifieke gezichten, bijvoorbeeld van een crimineel, zonder andere gezichten te herkennen en vast te leggen.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Camera',
    wikipediaDescription:
      'A camera is an optical instrument for recording or capturing images, which may be stored locally, transmitted to another location, or both. The images may be individual still photographs or sequences of images constituting videos or movies. The camera is a remote sensing device as it senses subjects without any contact . The word camera comes from camera obscura, which means "dark chamber" and is the Latin name of the original device for projecting an image of external reality onto a flat surface. The modern photographic camera evolved from the camera obscura. The functioning of the camera is very similar to the functioning of the human eye. The first permanent photograph was made in 1826 by Joseph Nicéphore Niépce.',
    subtypes: ['Telcamera', 'Kentekenherkenning', 'Beeld'],
    visible: true,
  },
  [CATEGORY_NAMES.SENSOR]: {
    isClustered: false,
    iconUrl: `${ICON_PATH}icon-sensor@3x.png`,
    name: DISPLAY_NAMES.SENSOR,
    enabled: true,
    description:
      'Een sensor verzamelt data over een specifiek onderwerp, bijvoorbeeld luchtkwaliteit, geluid, de vulling van een afvalcontainer. Deze data wordt verstuurd naar een plek waar deze verwerkt wordt, bijvoorbeeld tot een grafiek waarin aangegeven hoe vol een container is of een programma dat een signaal afgeeft wanneer de container 80% gevuld is zodat deze wordt opgenomen in de eerstvolgende route van een auto om de container te legen.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sensor',
    wikipediaDescription:
      'In the broadest definition, a sensor is a device, module, or subsystem whose purpose is to detect events or changes in its environment and send the information to other electronics, frequently a computer processor. A sensor is always used with other electronics, whether as simple as a light or as complex as a computer.',
    subtypes: ['Luchtkwaliteit', 'Vervoerstromen (aantal vervoermiddelen)', 'Geluid'],
    visible: true,
  },
};

/**
 * Global legend definition based on the categories that are enabled and visible
 */
export const legend = Object.entries(categories).reduce<{
  [key: string]: { name: string; enabled: boolean; iconUrl: string };
}>((acc, [key, category]) => (category.visible && category.enabled ? { ...acc, [key]: category } : { ...acc }), {});

/**
 * Global group of categories that should be clustered
 */
export const clusterCategories = Object.entries(categories).filter(([, value]) => value.isClustered);
