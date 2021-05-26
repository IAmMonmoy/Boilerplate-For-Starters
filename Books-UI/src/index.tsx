/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import App from 'app';

import { HelmetProvider } from 'react-helmet-async';

import initStore from './store';
import setupAxiosIntercertors from './utils/axios-interceptor';

const store = initStore();
setupAxiosIntercertors();

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE,
);
