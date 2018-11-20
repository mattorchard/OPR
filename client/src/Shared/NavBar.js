import React, {Component} from "react";
import LogoutButton from "./LogoutButton";
import Link from "react-router-dom/es/Link";
import {UserConsumer} from "../Contexts/UserContext";


export default class NavBar extends Component {
  render() {
    return <UserConsumer>
      {({authenticated})=>(
        authenticated ? <LogoutButton/> : <Link to="/login">Login</Link>
      )}
    </UserConsumer>
  }
}
