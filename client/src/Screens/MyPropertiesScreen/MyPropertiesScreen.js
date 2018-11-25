import React, {Component} from "react";
import AddPropertyDialog from "./AddPropertyDialog";
import axios from "axios";
import Alert from "../../Shared/Alert";

export default class MyPropertiesScreen extends Component {
  state = {successMessage: "", errorMessage: ""};

  addProperty = async propertyInfo => {
    try {
      await axios.post("/properties", propertyInfo);
      this.setState({successMessage: "Property Added", errorMessage: ""})
    } catch (error) {
      this.setState({errorMessage: "Unable to add property", successMessage: ""})
    }
  };
  render() {
    return <main>
      <h1>My Properties</h1>
      <AddPropertyDialog onSubmit={this.addProperty}/>
      <div>
        <Alert type="success">{this.state.successMessage}</Alert>
        <Alert type="danger">{this.state.errorMessage}</Alert>
      </div>
    </main>;
  }
}