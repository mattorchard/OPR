import React, {Component} from "react";
import {Link} from "react-router-dom";
import {UserConsumer} from "../../Contexts/UserContext";


export default class LandingScreen extends Component {

  render() {
    return <main>
      <h1>Online Property Rental System</h1>
      Welcome to Houses of Dreams Online Property Rental System
      <hr/>
      <UserConsumer>{({authenticated, user}) => {
        const links = { "/browse": "Browse Properties" };
        if (authenticated) {
          links["/my-account"] = "My Account";
          if (user.role === "owner") {
            links["/my-properties"] = "My Properties";
          } else if (user.role === "customer") {
            links["/visiting-list"] = "Visiting List";
          } else if (user.role === "agent") {
            links["/create-account"] = "Create Account";
          }
        }
        return <div className="row"> {
          Object.entries(links).map(([url, label]) =>
            <Link to={url} key={url} className="navigation-tile">{label}</Link>
        )} </div>;
      }}
      </UserConsumer>

    </main>;
  }
}