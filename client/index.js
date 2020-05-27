import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './components/App';
import { CookiesProvider, withCookies } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <AppWrapper />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
