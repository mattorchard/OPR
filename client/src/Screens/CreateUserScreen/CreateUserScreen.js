import React, {Component} from "react";
import ReactForm from "../../Shared/ReactForm";
import {request} from "../../Services/request";

export default class CreateUserScreen extends Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
  }

  async createUser(userInfo) {
    const response = await request("/users", {
      method: "POST",
      body: userInfo
    });
    if (!response.ok) {
      throw Error("Account creation failed")
    }
  }

  render() {
    return <main>
      <h1>Create User</h1>
      <UserDetailsForm onSubmit={this.createUser}/>
    </main>;
  }
}

class UserDetailsForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      role: ""
    };
  }
  render() {
    return <form className="vertical-form" onSubmit={event => {
      event.preventDefault();
      this.props.onSubmit(this.state);
    }}>
      <label>
        Username
        <input name="username" type="text" placeholder="jdoe" onChange={this.handleInputChange}/>
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="jdoe@example.com" onChange={this.handleInputChange}/>
      </label>
      <label>
        password
        <input name="password" type="password" placeholder="Password" onChange={this.handleInputChange}/>
      </label>
      <label>
        Account Type
        <select name="role" onChange={this.handleInputChange}>
          <option value="customer">Customer</option>
          <option value="owner">Owner</option>
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  }
}