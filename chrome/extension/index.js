import React from 'react';
import { render } from 'react-dom';
import App from '../../app/App';
import TrezorConnect from 'trezor-connect';

// Entry point into our application
const initialize = async () => {
  const root = document.querySelector('#root');
  if (root == null) {
    throw new Error('Root element not found.');
  }

  TrezorConnect.manifest({
    email: 'email@developer.com',
    appUrl: 'webextension-app-boilerplate',
  });

  render(
    <App />,
    root
  );
};

window.addEventListener('load', initialize);
