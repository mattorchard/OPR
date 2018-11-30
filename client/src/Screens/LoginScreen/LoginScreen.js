import React, {Component} from 'react';
import ReactForm from "../../Shared/ReactForm";
import {UserConsumer} from "../../Contexts/UserContext";
import Redirect from "react-router-dom/es/Redirect";

class LoginForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  async login(event, saveAuth) {
    event.preventDefault();
    const loginResponse = await fetch("/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    if (loginResponse.ok) {
      const {user, token} = await loginResponse.json();
      saveAuth(user, token);
    } else if (loginResponse.status === 401) {
      this.setState({loginFailed: true});
    } else {
      console.error("Unable to login", loginResponse);
    }
  }

  render() {
    return <UserConsumer>
      {({saveAuth}) => (
        <form className="card vertical-form" onSubmit={(event) => this.login(event, saveAuth)}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={this.state.username}
              className="rounded-input"
              onChange={this.handleInputChange}/>
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              className="rounded-input"
              onChange={this.handleInputChange}/>
          </label>
          {this.state.loginFailed && (<span>
            <p>Incorrect username / password</p>
            </span>)}
          <button type="submit">Login</button>
        </form>
      )}
    </UserConsumer>
  }
}

class LoginScreen extends Component {

  render() {
    return <UserConsumer>
      {({authenticated}) => (
        authenticated ? <Redirect to="/"/> : <main>
          <h1>Login</h1>
          <LoginForm/>
        </main>
      )}
    </UserConsumer>
  }
}

export default LoginScreen