import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class LandingScreen extends Component {
  render() {
    return <main>
      Welcome to Houses of Dreams Online Property Rental System
      <ul>
        <li>
          <Link to="/my-properties">My Properties</Link>
        </li>
        <li>
          <Link to="/my-account">My Account</Link>
        </li>
        <li>
          <Link to="/browse">Browse Properties</Link>
        </li>
        <li>
          <Link to="/visiting-list">Visiting List</Link>
        </li>
      </ul>
    </main>;
  }
}