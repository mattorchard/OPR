import React, { Component } from 'react';
import ReactForm from "../Shared/ReactForm";
import auth from "../Shared/auth";

class LoginForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  async login(event) {
    event.preventDefault();
    const loginResponse = await fetch("/users/login", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
    if (loginResponse.ok) {
      const {user, token} = await loginResponse.json();
      auth.setToken(token, true);
      auth.setUserInfo(user, true);
    } else if (loginResponse.status === 401) {
      this.setState({loginFailed: true});
    } else {
      console.error("Unable to login", loginResponse);
    }
  }

  render() {
    let loginFailedMessage;
    if (this.state.loginFailed) {
      loginFailedMessage = (<span>
        Incorrect username / password
      </span>);
    }
    return (
      <form onSubmit={this.login}>
        <label>
          Username
          <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange}/>
        </label>
        <label>
          Password
          <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
        </label>
        {loginFailedMessage}
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

class LoginScreen extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm/>
        <button onClick={async ()=>{
          const response = await fetch("/users/me", {
            headers:{
              'Content-Type': 'application/json',
              "x-access-token": auth.getToken()
            }
          });
          console.log(response)
        }}>Test</button>
      </div>
    );
  }
}
export default LoginScreen