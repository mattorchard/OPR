import React, {Component} from "react";
import {UserProvider} from "./UserContext";
import AuthStore from "../Services/AuthStore";
import axios from "axios";

export default class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      token: null,
      user: {
        role: "visitor"
      }
    };
    this.saveAuth = this.saveAuth.bind(this);
    this.forgetAuth = this.forgetAuth.bind(this);
  }

  saveAuth(user, token) {
    this.setState({user, token, authenticated: true});
    axios.defaults.headers.common['x-access-token'] = token;
    AuthStore.setToken(token, true);
  }

  forgetAuth() {
    this.setState({user: null, token: null, authenticated: false});
    axios.defaults.headers.common['x-access-token'] = null;
    AuthStore.clearToken();
  }

  async componentDidMount() {
    const token = AuthStore.getToken();
    if (token) {
      const response = await fetch("/users/me", {headers: {"x-access-token": token}});
      const tokenIsValid = response.status === 200;
      if (tokenIsValid) {
        const userInfo = await response.json();
        this.saveAuth(userInfo, token)
      } else {
        this.forgetAuth();
      }
    }
  }

  render() {
    const authProviderValue = {
      ...this.state,
      saveAuth: this.saveAuth,
      forgetAuth: this.forgetAuth
    };
    return <UserProvider value={authProviderValue}>
      {this.props.children}
    </UserProvider>
  }
}