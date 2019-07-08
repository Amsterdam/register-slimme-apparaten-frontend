/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import defaultMessages from './translations/en.json';
import { DEFAULT_LOCALE } from '../src/containers/App/constants';

const translationMessages = {};
const appLocales = process.env.LANGUAGES.split(',').map((lang) => lang.trim());

appLocales.forEach((lang) => {
  try {
    /* eslint-disable global-require */
    const langData = require(`react-intl/locale-data/${lang}`);
    const messages = require(`./translations/${lang}.json`);
    /* eslint-enable */

    addLocaleData(langData);
    translationMessages[lang] = formatTranslationMessages(lang, messages);
  } catch (e) {
    // probably a missing translation file
  }
});

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, defaultMessages)
      : {};

  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];

    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export { formatTranslationMessages, appLocales, translationMessages };
