/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'core-js/shim';
import 'regenerator-runtime/runtime';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import MatomoTracker from '@datapunt/matomo-tracker-js';
import { ThemeProvider, GlobalStyle } from '@datapunt/asc-ui';
import 'leaflet/dist/leaflet';

/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.png';
/* eslint-enable import/no-webpack-loader-syntax */

// Import marker icons so Webpack adds them as separate files instead of inlining them
import '../public/images/icon-camera-gebied@3x.png';
import '../public/images/icon-camera@3x.png';
import '../public/images/icon-beacon@3x.png';
import '../public/images/icon-sensor@3x.png';
import '../public/images/icon-laadpaal@3x.png';
import '../public/images/icon-verkeer@3x.png';
import '../public/images/icon-lantaarn@3x.png';

// Import CSS and Global Styles
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'static/nlmaps.css';
import 'amsterdam-stijl/dist/css/ams-stijl.css';
import history from 'utils/history';

// Import root app
import App from './containers/App';
import { authenticateUser } from './containers/App/actions';
import { authenticate } from './shared/services/auth/auth';

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';

import './global.scss';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

// Setup Matomo
const hostname = window && window.location && window.location.hostname;
const MatomoInstance = new MatomoTracker({
  urlBase: 'https://analytics.data.amsterdam.nl/',
  siteId: hostname === 'slimmeapparaten.amsterdam.nl' ? 17 : 18,
});

MatomoInstance.trackPageView();

const render = messages => {
  ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        <LanguageProvider messages={messages}>
          <ThemeProvider>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  if (!Intl.PluralRules) {
    /* eslint-disable global-require */
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
    require('@formatjs/intl-pluralrules/dist/locale-data/nl'); // Add locale data for de
    /* eslint-enable global-require */
  }

  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/nl.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'acceptance') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

// Authenticate and start the authorization process
const credentials = authenticate();
store.dispatch(authenticateUser(credentials));
