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
      displayTime: '',
    }
    this.setDisplayTime = this.setDisplayTime.bind(this);
  }

  setDisplayTime() {
    let display = moment("2020-05-27 21:33").utc().diff(moment().utc());
    let displayTime = moment(display).format("HH:mm:ss");
    this.setState({displayTime});
  }

  componentDidMount() {
    setInterval(this.setDisplayTime , 1000)
  }

  render() {
    return (
      <div className="App">
        <canvas id="demo-canvas"></canvas>
        <div className='launch-date'>SpaceX launch in {this.state.displayTime}</div>
        <div className='stream-link'>
          <a href="https://www.youtube.com/watch?v=Aymrnzianf0" target='_blank' rel='noopener noreferrer'>Click here for stream!</a>
        </div>
      </div>
    );
  }
}

export default App;