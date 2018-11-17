import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
// import { Router, IndexRoute, Route, browserHistory } from 'react-router';


class App extends Component {
  state = { users: []};

  async componentDidMount() {
    const response = await fetch("/users");
    this.setState({users: await response.json()});
  }

  render() {
    return (
      <LoginScreen/>
    );
  }
}

export default App;
