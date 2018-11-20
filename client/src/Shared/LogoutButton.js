import React, {Component} from "react";
import {UserConsumer} from "../Contexts/UserContext";


export default class LogoutButton extends Component {
  render() {
    return <UserConsumer>{({unAuthenticate}) => (
      <button type="button" onClick={unAuthenticate}>Logout</button>
    )}</UserConsumer>
  }
}
