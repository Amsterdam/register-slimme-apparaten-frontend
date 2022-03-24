/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import MatomoTracker from '@datapunt/matomo-tracker-js';
import { ThemeProvider, GlobalStyle } from '@amsterdam/asc-ui';
import 'leaflet/dist/leaflet';

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
