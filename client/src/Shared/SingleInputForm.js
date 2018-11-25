import React from 'react';
import ReactForm from "./ReactForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class SingleInputForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: props.value || ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      try {
        await this.props.onSubmit(this.state.value);
        this.setState({open: false});
      } catch (e) {
        console.warn(e);
      }
    }
  }

  renderInput() {
    return React.cloneElement(
      React.Children.only(this.props.children), {
        required: true,
        name: "value",
        value: this.state.value,
        onChange: this.handleInputChange
      });
  }

  render() {
    if (this.state.open) {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.renderInput()}
          <button
            className="btn btn-success"
            type="submit"
            aria-label="Submit">
            <FontAwesomeIcon icon="check" />
          </button>
          <button
            className="btn btn-danger"
            type="reset"
            aria-label="Cancel"
            onClick={() => this.setState({open: false, value: ""})}>
            <FontAwesomeIcon icon="times" />
          </button>
        </form>
      );
    }
    else {
      return (
        <button onClick={() => this.setState({open: true})}>
          {this.props.label}
        </button>
      );
    }
  }
}