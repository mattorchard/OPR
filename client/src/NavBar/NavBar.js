import React, {Component} from "react";
import Link from "react-router-dom/es/Link";
import {UserConsumer} from "../Contexts/UserContext";
import MyAccountBadge from "./MyAccountBadge";
import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    return <nav className="nav-bar">
      <Link to="/" className="nav-bar__title">OPR System</Link>
      <UserConsumer>
        {({authenticated, user}) => (
          authenticated ? <MyAccountBadge {...user}/> : <Link to="/login">Login</Link>
        )}
      </UserConsumer>
    </nav>
  }
}
