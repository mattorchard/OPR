import React, {Component} from "react";
import {UserConsumer} from "../Contexts/UserContext";


export default class LogoutButton extends Component {
  render() {
    return <UserConsumer>{({forgetAuth}) => (
      <button type="button" onClick={forgetAuth}>Logout</button>
    )}</UserConsumer>
  }
}
