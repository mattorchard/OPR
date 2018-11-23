import React, {Component} from "react";
import {UserConsumer} from "../Contexts/UserContext";
import Link from "react-router-dom/es/Link";


export default class LogoutButton extends Component {
  render() {
    return <UserConsumer>{({forgetAuth}) => (
      <Link to="/" onClick={forgetAuth}>Logout</Link>
    )}</UserConsumer>
  }
}
