import React, {Component} from "react";
import {UserConsumer} from "../../Contexts/UserContext";
import SingleInputForm from "../../Shared/SingleInputForm";
import axios from "axios";
import {withRouter} from "react-router-dom";
import Modal from "react-modal";
import {DynamicSizedModal} from "../../Shared/Constants";
import ChangePassword from "./ChangePassword";
import Alert from "../../Shared/Alert";


class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
      errorMessage: "",
      isConfirmingAccountDeactivation: false
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deactivateAccount = this.deactivateAccount.bind(this);
  }

  async changePassword(password) {
    try {
      await axios.patch("/users", {password});
      this.setState({successMessage: "Password updated", errorMessage: ""});
    } catch (error) {
      throw error;
    }
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

  async deactivateAccount(forgetAuth) {
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
            <hr/>

            <div style={{display: "flex", justifyContent: "stretch"}}>
              <SingleInputForm
                onSubmit={this.updateEmail}
                value={user.email}
                label="Change email">
                <input type="email"
                       placeholder="jdoe@example.com"
                       className="rounded-input"/>
              </SingleInputForm>

              <ChangePassword changePassword={this.changePassword}/>

              <button type="button" onClick={() => this.setState({isConfirmingAccountDeactivation: true})}>
                Deactivate account
              </button>
            </div>

            <div>
              <Alert type="danger">{this.state.errorMessage}</Alert>
              <Alert type="success">{this.state.successMessage}</Alert>
            </div>

            <Modal contentLabel="Confirm Account Deactivation"
                   isOpen={this.state.isConfirmingAccountDeactivation}
                   onRequestClose={() => this.setState({isConfirmingAccountDeactivation: false})}
                   appElement={document.body}
                   style={DynamicSizedModal}>
              <h3>Confirm Account Deactivation</h3>
              <p>
                Are you sure you want to <strong>deactivate</strong> your account?
                This action will also sign you out.
              </p>
              <button type="button" onClick={() => this.setState({isConfirmingAccountDeactivation: false})}>
                Cancel
              </button>
              <button type="button" onClick={() => this.deactivateAccount(forgetAuth)}>
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
    return <div className="card card--inset">
      <ul>
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
    </div>
  }
}

export default withRouter(UserScreen)