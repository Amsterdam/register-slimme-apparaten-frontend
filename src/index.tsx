/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, GlobalStyle, ascDefaultTheme } from '@amsterdam/asc-ui';

// Import root app
import App from './containers/App';

// Import CSS and Global Styles
import 'leaflet/dist/leaflet.css';
import './global.scss';

const MOUNT_NODE = document.getElementById('app');

// Remove previously installed service workers.
if (navigator !== undefined) {
  navigator?.serviceWorker?.getRegistrations()?.then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <ThemeProvider
        theme={{
          ...ascDefaultTheme,
          typography: { ...ascDefaultTheme.typography, fontFamily: 'Amsterdam Sans, Arial, Helvetica, sans-serif' },
        }}
      >
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </BrowserRouter>,
    MOUNT_NODE,
  );
};

render();
