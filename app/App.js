import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import TrezorConnect from 'trezor-connect';

function onClick() {
  TrezorConnect.getAddress({
    path: "m/49'/0'/0'/0/0",
  }).then(response => {
    const message = response.success ? `BTC Address: ${response.payload.address}` : `Error: ${response.payload.error}`;
    chrome.notifications.create(new Date().getTime().toString(), {
      type: 'basic',
      iconUrl: 'icons/48.png',
      title: 'TrezorConnect',
      message,
    });
  }).catch(error => {
    console.error('TrezorConnectError', error);
  });
}

class App extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          height: 'calc(100vh - 20px)',
        }}
      >
        <button type="button" onClick={onClick}>
          Click to open Trezor
        </button>
      </div>
    );
  }
}

export default hot(App);
