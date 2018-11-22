import React, {Component} from 'react';
import ReactForm from "../../Shared/ReactForm";
import {UserConsumer} from "../../Contexts/UserContext";
import Redirect from "react-router-dom/es/Redirect";
import axios from "axios";

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
        <form onSubmit={(event) => this.login(event, saveAuth)}>
          <label>
            Username
            <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange}/>
          </label>
          <label>
            Password
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
          </label>
          {this.state.loginFailed && (<span>
            Incorrect username / password
            </span>)}
          <input type="submit" value="Login"/>
        </form>
      )}
    </UserConsumer>
  }
}

class LoginScreen extends Component {
  state = {test: ""};

  render() {
    return <UserConsumer>
      {({authenticated}) => (
        authenticated ? <Redirect to="/"/> : <main>
          <h1>Login</h1>
          <LoginForm/>
          <button onClick={async () => {
            const response = await axios.get("/users/me");
            this.setState({test: response.status})
          }}>Test
          </button>
          {this.state.test}
        </main>
      )}
    </UserConsumer>
  }
}

export default LoginScreen