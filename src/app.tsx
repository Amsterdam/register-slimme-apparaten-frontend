/* eslint-disable */
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
import { ThemeProvider, GlobalStyle } from '@amsterdam/asc-ui';
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
// import 'amsterdam-stijl/dist/css/ams-stijl.css';
import history from 'utils/history';

// Import root app
import App from './containers/App';
import { authenticateUser } from './containers/App/actions';
import { authenticate } from './shared/services/auth/auth';

import './global.scss';

import configureStore from './configureStore';

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

MatomoInstance.trackPageView({});

const render = () => {
  ReactDOM.render(
    // tslint:disable-next-line:jsx-wrap-multiline
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={history} context={ReactReduxContext}>
        <ThemeProvider>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

render();

if (module.hot) {
  module.hot.accept();
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
