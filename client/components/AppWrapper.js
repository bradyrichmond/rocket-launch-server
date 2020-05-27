import React from 'react';
import App from './App';
import { withCookies } from 'react-cookie';

class AppWrapper extends React.Component {
  render() {
    return <App />
  }
}

export default withCookies(AppWrapper);