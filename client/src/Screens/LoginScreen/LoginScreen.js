import React, { Component } from 'react';
import ReactForm from "../../Shared/ReactForm";
import {request} from "../../Services/request";
import {UserConsumer} from "../../Contexts/UserContext";

class LoginForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  async login(event, authenticate) {
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
      debugger;
      authenticate(user, token);
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
    return <UserConsumer>
      {({authenticate})=>(
      <form onSubmit={(event) => this.login(event, authenticate)}>
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
      )}
    </UserConsumer>
  }
}

class LoginScreen extends Component {
  render() {
    return (
      <main>
        <h1>Login</h1>
        <LoginForm/>
        <button onClick={async ()=>{
          const response = await request("/users/me");
          console.log(response)
        }}>Test</button>
      </main>
    );
  }
}
export default LoginScreen