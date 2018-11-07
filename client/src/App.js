import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { users: []};

  async componentDidMount() {
    const response = await fetch("/users");
    this.setState({users: await response.json()});
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>{user.username}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
