import React from 'react';
import '../css/App.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      displayTime: ''
    }
    this.setDisplayTime = this.setDisplayTime.bind(this);
  }

  setDisplayTime() {
    let display = moment("2020-06-04 00:55").utc().diff(moment().utc());
    let displayTime = `${moment(display).format("DD") - 1} days ${moment(display).format("HH:mm:ss")}`;
    this.setState({displayTime});
  }

  componentDidMount() {
    setInterval(this.setDisplayTime, 1000)
  }

  render() {
    return (
      <div className="App">
        <canvas id="demo-canvas"></canvas>
        <div className='launch-date'>SpaceX launch estimated: {this.state.displayTime}</div>
      </div>
    );
  }
}

export default App;