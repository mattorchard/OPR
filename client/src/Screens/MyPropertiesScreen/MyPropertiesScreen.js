import React, {Component} from "react";
import AddPropertyDialog from "./AddPropertyDialog";
import axios from "axios";
import Alert from "../../Shared/Alert";
import PropertySummary from "../../Shared/Properties/PropertySummary";
import {withAuth} from "../../Services/WithAuthentication";


export default class MyPropertiesScreen extends Component {
  state = {myProperties: [], successMessage: "", errorMessage: ""};

  addProperty = async propertyInfo => {
    try {
      await axios.post("/properties", propertyInfo);
      this.setState({successMessage: "Property Added", errorMessage: ""})
    } catch (error) {
      const message = (error.response && error.response.data) || "Unable to add property";
      this.setState({errorMessage: message, successMessage: ""})
    }
  };

  async getMyProperties() {
    try {
      const response = await axios.get("/properties");
      this.setState({myProperties: response.data});
    } catch (error) {
      this.setState({errorMessage: "Unable to fetch properties", successMessage: ""})
    }
  }

  componentDidMount() {
    withAuth(this.getMyProperties.bind(this));
  }

  render() {
    return <main>
      <h1>My Properties</h1>
      <AddPropertyDialog onSubmit={this.addProperty}/>
      <div>
        <Alert type="success">{this.state.successMessage}</Alert>
        <Alert type="danger">{this.state.errorMessage}</Alert>
      </div>

      <div>
        {this.state.myProperties.map(property =>
          <PropertySummary key={property._id} {...property} owns={true}/>)}
      </div>
    </main>;
  }
}