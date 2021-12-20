/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'regenerator-runtime/runtime';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import MatomoTracker from '@datapunt/matomo-tracker-js';
import { ThemeProvider, GlobalStyle } from '@amsterdam/asc-ui';
import 'leaflet/dist/leaflet';

import '!file-loader?name=[name].[ext]!./images/favicon.png';

// Import CSS and Global Styles
import 'leaflet/dist/leaflet.css';

// Import root app
import App from './containers/App';

import './global.scss';

import { BrowserRouter } from 'react-router-dom';

const MOUNT_NODE = document.getElementById('app');

// Setup Matomo
const hostname = window && window.location && window.location.hostname;
const MatomoInstance = new MatomoTracker({
  urlBase: 'https://analytics.data.amsterdam.nl/',
  siteId: hostname === 'sensorenregister.amsterdam.nl' ? 17 : 18,
});

MatomoInstance.trackPageView({});

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </BrowserRouter>,
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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('offline-plugin/runtime').install();
}
