import React, {Component} from "react";
import {UserConsumer} from "../../Contexts/UserContext";
import ReactForm from "../../Shared/ReactForm";

export default class UserScreen extends Component {
  render() {
    return <main>
      <h1>My Account</h1>
      <UserConsumer>{
        ({user}) => (
          <UserDetails {...user}>
            <li>Email: <EditEmail email={user.email}/></li>
            <li><EditPassword/></li>
          </UserDetails>
        )}
      </UserConsumer>
    </main>;
  }
}

class UserDetails extends Component {

  render() {
    return <ul className="vertical-form">
      <li>
        Given Name: {this.props.givenName}
      </li>
      <li>
        Last Name: {this.props.lastName}
      </li>
      <li>
        Username: {this.props.username}
      </li>
      <li>
        Role: {this.props.role}s
      </li>
      {this.props.children}
    </ul>
  }
}

class EditEmail extends ReactForm {
  state = {
    email: this.props.email,
    enabled: false
  };

  render() {
    return <form>
      <input
        type="email"
        placeholder="jdoe@example.com"
        value={this.state.email}
        disabled={!this.state.enabled}
        onChange={this.handleInputChange}>
      </input>
      <button onClick={this.toggle}>Edit</button>
    </form>
  }
}

class EditPassword extends ReactForm {
  state = {
    enabled: false
  };

  render() {
    if (this.state.enabled) {
      return <form/>
    } else {
      return <button type="button">Change password</button>
    }
  }
}