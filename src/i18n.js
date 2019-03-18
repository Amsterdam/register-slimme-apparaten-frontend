/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import nlLocaleData from 'react-intl/locale-data/nl';
import daLocaleData from 'react-intl/locale-data/da';

import { DEFAULT_LOCALE } from '../src/containers/App/constants';

import enTranslationMessages from './translations/en.json';
import nlTranslationMessages from './translations/nl.json';
import daTranslationMessages from './translations/da.json';

addLocaleData(enLocaleData);
addLocaleData(nlLocaleData);
addLocaleData(daLocaleData);

export const appLocales = [
  'en',
  'nl',
  'da',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  nl: formatTranslationMessages('nl', nlTranslationMessages),
  da: formatTranslationMessages('da', daTranslationMessages),
};
