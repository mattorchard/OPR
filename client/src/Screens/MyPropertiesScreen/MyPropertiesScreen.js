import React, {Component} from "react";
import AddPropertyDialog from "./AddPropertyDialog";
import axios from "axios";
import Alert from "../../Shared/Alert";
import OwnerPropertySummary from "../../Shared/Properties/OwnerPropertySummary";
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

  getMyProperties = async () => {
    try {
      const response = await axios.get("/properties");
      this.setState({myProperties: response.data});
    } catch (error) {
      this.setState({errorMessage: "Unable to fetch properties", successMessage: ""})
    }
  };

  deleteProperty = async propertyId => {
    try {
      await axios.delete(`/properties/${propertyId}`);
      window.location.reload();
    } catch (error) {
      const message = (error.response && error.response.data) || "Unable to delete property";
      this.setState({errorMessage: message, successMessage: ""});
    }
  };

  editProperty = async property => {
    try {
      const {_id, rent, bathrooms, bedrooms, otherRooms, photoIds} = property;
      await axios.patch(`/properties/${_id}`, {rent, bathrooms, bedrooms, otherRooms, photoIds});
      window.location.reload();
    } catch (error) {
      const message = (error.response && error.response.data) || "Unable to update property";
      this.setState({errorMessage: message, successMessage: ""});
    }
  };


  componentDidMount() {
    withAuth(this.getMyProperties.bind(this));
  }

  render() {
    return <main>
      <h1>My Properties</h1>

      <div>
        {this.state.myProperties.map(property =>
          <OwnerPropertySummary
            key={property._id}
            {...property}
            owns={true}
            onDeleteProperty={this.deleteProperty}
            onEditProperty={this.editProperty}/>
        )}
      </div>
      <hr/>

      <AddPropertyDialog onSubmit={this.addProperty}/>
      <hr/>

      <div>
        <Alert type="success">{this.state.successMessage}</Alert>
        <Alert type="danger">{this.state.errorMessage}</Alert>
      </div>

    </main>;
  }
}