import React, {Component} from "react";
import {UserConsumer} from "../../Contexts/UserContext";
import ReactForm from "../../Shared/ReactForm";
import SingleInputForm from "../../Shared/SingleInputForm";
import axios from "axios";
import {withRouter} from "react-router-dom";

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
      errorMessage: ""
    };
    this.updateEmail = this.updateEmail.bind(this);
    UserScreen.deactivateAccount = UserScreen.deactivateAccount.bind(this);
  }

  async updateEmail(email)  {
    try {
      await axios.put("/users", {email});
      this.setState({successMessage: "Email updated", errorMessage: ""});
    } catch (error) {
      console.error(error);
      if (error.response.status === 409) {
        this.setState({errorMessage: "Email already in use", successMessage: ""});
      } else {
        this.setState({errorMessage: "Unknown error", successMessage: ""});
      }
      throw error;
    }
  }

  static async deactivateAccount(forgetAuth) {
    try {
      await axios.delete("/users");
      this.props.history.push("/");
      forgetAuth();
    } catch (error) {
      this.setState({errorMessage: "Unable to delete account", successMessage: ""})
    }
  }

  render() {
    return <main>
      <h1>My Account</h1>
      <UserConsumer>{
        ({user, forgetAuth}) => (
          <div>
            <UserDetails {...user}/>
            <SingleInputForm
              onSubmit={this.updateEmail}
              value={user.email}
              label="Change email">
              <input type="email" placeholder="jdoe@example.com"/>
            </SingleInputForm>
            <EditPassword/>
            {this.state.errorMessage}
            {this.state.successMessage}
            <button type="button" onClick={() => UserScreen.deactivateAccount(forgetAuth)}>Deactivate account?</button>
          </div>
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
        Role: {this.props.role}
      </li>
      <li>
        Email: {this.props.email}
      </li>

    </ul>
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

export default withRouter(UserScreen)