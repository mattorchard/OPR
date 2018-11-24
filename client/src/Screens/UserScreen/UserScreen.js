import React, {Component} from "react";
import {UserConsumer} from "../../Contexts/UserContext";
import SingleInputForm from "../../Shared/SingleInputForm";
import axios from "axios";
import {withRouter} from "react-router-dom";
import Modal from "react-modal";
import {DynamicSizedModal} from "../../Shared/Constants";
import ChangePassword from "./ChangePassword";


class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
      errorMessage: "",
      isConfirmingAccountDeactivation: false
    };
    this.updateEmail = this.updateEmail.bind(this);
    UserScreen.deactivateAccount = UserScreen.deactivateAccount.bind(this);
  }

  async updateEmail(email) {
    try {
      await axios.patch("/users", {email});
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
            <h2>Details:</h2>
            <UserDetails {...user}/>
            <h2>Actions:</h2>
            <ul>
              <li>
                <SingleInputForm
                  onSubmit={this.updateEmail}
                  value={user.email}
                  label="Change email">
                  <input type="email"
                         placeholder="jdoe@example.com"
                         className="rounded-input"/>
                </SingleInputForm>
              </li>
              <li>
                <ChangePassword/>
              </li>
              <li>
                <button type="button" onClick={() => this.setState({isConfirmingAccountDeactivation: true})}>
                  Deactivate account?
                </button>
              </li>
            </ul>
            {this.state.errorMessage}
            {this.state.successMessage}

            <Modal contentLabel="Confirm Account Deactivation"
                   isOpen={this.state.isConfirmingAccountDeactivation}
                   onRequestClose={() => this.setState({isConfirmingAccountDeactivation: false})}
                   style={DynamicSizedModal}>
              <h3>Confirm Account Deactivation</h3>
              <p>
                Are you sure you want to <strong>deactivate</strong> your account?
                This action will also sign you out.
              </p>
              <button type="button" onClick={() => this.setState({isConfirmingAccountDeactivation: false})}>
                Cancel
              </button>
              <button type="button" onClick={() => UserScreen.deactivateAccount(forgetAuth)}>
                Deactivate
              </button>
            </Modal>
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

export default withRouter(UserScreen)