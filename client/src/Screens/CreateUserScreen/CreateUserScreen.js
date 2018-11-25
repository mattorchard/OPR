import React, {Component} from "react";
import ReactForm from "../../Shared/ReactForm";
import axios from "axios";
import "./CreateUserScreen.css";
import Alert from "../../Shared/Alert";


export default class CreateUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      successMessage: null
    };
    this.createUser = this.createUser.bind(this);
  }

  async createUser(userInfo) {
    try {
      await axios.post("/users", userInfo);
      this.setState({successMessage: "Account Created!", errorMessage: null});
    } catch (error) {
      let errorMessage;
      if (error.response.status === 412) {
        errorMessage = "Missing fields"
      } else if (error.response.status === 409) {
        errorMessage = "Username or email already in use";
      } else {
        errorMessage = "Unknown error";
      }
      this.setState({errorMessage, successMessage: null});
    }

  }

  render() {
    return <main className="create-user-screen">
      <h1>Create User</h1>
      <UserDetailsForm onSubmit={this.createUser}/>
      <div>
        <Alert type="danger">{this.state.errorMessage}</Alert>
        <Alert type="success">{this.state.successMessage}</Alert>
      </div>
    </main>
  }
}

class UserDetailsForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      role: "customer",
      givenName: "",
      lastName: ""
    };
  }

  render() {
    return (
      <form className="create-user-form vertical-form card"
            onSubmit={event => {
              event.preventDefault();
              this.props.onSubmit(this.state);
            }}>
        <label>
          Account Type
          <select name="role"
                  onChange={this.handleInputChange}
                  className="rounded-input">
            <option value="customer">Customer</option>
            <option value="owner">Owner</option>
          </select>
        </label>
        {this.state.role === "customer" && (
          <label>
            Maximum Rent (per month)
            <input
              name="maximumRent"
              type="number"
              className="rounded-input"
              required={this.state.role === "customer"}
              placeholder={500}
              onChange={this.handleInputChange}/>
          </label>
        )}
        <label>
          Username
          <input
            name="username"
            type="text"
            required
            minLength={4}
            maxLength={100}
            placeholder="jdoe"
            className="rounded-input"
            onChange={this.handleInputChange}/>
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="jdoe@example.com"
            className="rounded-input"
            onChange={this.handleInputChange}/>
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            minLength={6}
            maxLength={100}
            className="rounded-input"
            onChange={this.handleInputChange}/>
        </label>
        <label>
          Given Name
          <input
            name="givenName"
            type="text"
            required
            minLength={2}
            maxLength={100}
            placeholder="John"
            className="rounded-input"
            onChange={this.handleInputChange}/>
        </label>
        <label>
          Family Name
          <input
            name="lastName"
            type="text"
            required
            minLength={2}
            maxLength={100}
            placeholder="Doe"
            className="rounded-input"
            onChange={this.handleInputChange}/>
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}