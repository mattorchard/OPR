import React, {Component} from "react";
import {UserProvider} from "./UserContext";
import AuthStore from "../Services/AuthStore";

export default class Auth extends Component {

  constructor(props) {
    super(props);
    const token = AuthStore.getToken();
    if (token) {
      const userInfo = AuthStore.getUserInfo();
      this.state = {
        authenticated: true,
        token: token,
        user: userInfo
      };
    } else {
      this.state = {
        authenticated: false,
        token: null,
        user: {
          role: "visitor"
        }
      };
    }
    this.authenticate = this.authenticate.bind(this);
    this.unAuthenticate = this.unAuthenticate.bind(this);
  }

  authenticate(user, token) {
    this.setState({user, token, authenticated: true});
    AuthStore.setToken(token, true);
    AuthStore.setUserInfo(user, true);
    window.location.reload()
  }

  unAuthenticate() {
    this.setState({user: null, token: null, authenticated: false});
    AuthStore.clearUserInfo();
    AuthStore.clearToken();
    window.location.reload()
  }

  render() {
    const authProviderValue = {
      ...this.state,
      authenticate: this.authenticate,
      unAuthenticate: this.unAuthenticate
    };
    return <UserProvider value={authProviderValue}>
      {this.props.children}
    </UserProvider>
  }
}