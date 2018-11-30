import React, {Component} from "react";
import ReactForm from "../../Shared/ReactForm";
import SelectAvailableLocation from "../../Shared/SelectAvailableLocation";
import SearchPropertyForm from "../../Shared/Properties/SearchPropertiesForm";
import axios from "axios";
import Alert from "../../Shared/Alert";
import PropertySummary from "../../Shared/Properties/PropertySummary";


export default class BrowsePropertiesScreen extends Component {

  state = {errorMessage: "", successMessage: "", properties: []};

  render() {
    return <main>
      <h1>Browse Properties</h1>
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <SearchPropertyForm onSubmit={this.searchProperties}/>
        <LocationForm onSubmit={this.browsePropertiesByLocation}/>
      </div>
      <hr/>
      <div>
        <Alert type="success">{this.state.successMessage}</Alert>
        <Alert type="danger">{this.state.errorMessage}</Alert>
      </div>
      <div>
        {this.state.properties.map(property =>
          <PropertySummary key={property._id} {...property}/>)
        }
      </div>
    </main>;
  }

  fetchFailed = () => this.setState({
    errorMessage: "Error trying to fetch properties",
    successMessage: "",
    properties: []
  });

  browsePropertiesByLocation = async location => {
    try {
      const response = await axios.get(`/properties/browse/${location}`);
      const properties = response.data;
      const successMessage = properties.length ? "" : `No properties for location: "${location}"`;
      this.setState({properties, successMessage, errorMessage: ""});
    } catch (error) {
      console.error("Error browsing for properties", error);
      this.fetchFailed();
    }
  };

  searchProperties = query => {
    debugger;
  };
}

class LocationForm extends ReactForm {
  state = {location: ""};

  submit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.location);
  };

  render() {
    return <div>
      <form className="vertical-form card card--padded" onSubmit={this.submit}>
        <h2>Browse by Location</h2>
        <label>
          <SelectAvailableLocation
            name="location"
            onChange={this.handleInputChange}/>
        </label>
        <button type="submit">Browse</button>
      </form>
    </div>;
  }
}