import React from "react";
import ReactForm from "../../Shared/ReactForm";
import Modal from "react-modal";
import {DynamicSizedModal} from "../../Shared/Constants";


export default class ChangePassword extends ReactForm {
  state = {
    enabled: false,
    password: "",
    confirmPassword: "",
    errorMessage: ""
  };

  close = () => {
    this.setState({
      enabled: false,
      password: "",
      confirmPassword: ""
    });
  };

  open = () => {
    this.setState({
      enabled: true,
      password: "",
      confirmPassword: "",
      errorMessage: ""
    })
  };

  handleInputChange = event => {
    const field = event.target.name;
    const value = event.target.value;
    this.setState(oldState => {
      const newState = {[field]: value};
      const otherField = field === "password" ? "confirmPassword" : "password";
      if (oldState[otherField] !== newState[field]) {
        newState.errorMessage = "Passwords must match";
      } else {
        newState.errorMessage = "";
      }
      return newState;
    })
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.confirmPassword === this.state.password) {
      try {
        this.props.onSubmit(this.state.password);
        this.close();
      } catch (error) {
        this.setState({errorMessage: "Unable to change password"});
      }
    }
  };

  render() {

    return <React.Fragment>
      {!this.state.enabled && <button type="button" onClick={this.open}>Change password</button>}
      <Modal contentLabel="Change Password"
             isOpen={this.state.enabled}
             onRequestClose={this.close}
             style={DynamicSizedModal}>
        <form className="vertical-form" onSubmit={this.onSubmit}>
          <h3>Change Password</h3>
          <label>
            Password
            <input type="password"
                   name="password"
                   className="rounded-input"
                   required
                   value={this.state.password}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Confirm Password
            <input type="password"
                   name="confirmPassword"
                   className="rounded-input"
                   required
                   value={this.state.confirmPassword}
                   onChange={this.handleInputChange}/>
          </label>
          <p>{this.state.errorMessage}</p>
          <button className="btn btn-danger" type="reset" onClick={this.close}>Cancel</button>
          <button className="btn btn-success" type="submit" onClick={this.onSubmit}>Submit</button>
        </form>
      </Modal>
    </React.Fragment>
  }
}