import React, {Component} from "react";
import ReactForm from "../../Shared/ReactForm";
import SelectAvailableLocation from "../../Shared/SelectAvailableLocation";
import SearchPropertyForm from "../../Shared/Properties/SearchPropertiesForm";
import axios from "axios";
import Alert from "../../Shared/Alert";
import PropertySummary from "../../Shared/Properties/PropertySummary";


export default class BrowsePropertiesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {errorMessage: "", successMessage: "", properties: []};
    this.searchResultsRef = React.createRef();
  }

  scrollToSearchResults = () => {
    window.scrollTo({
      top:this.searchResultsRef.current.offsetTop,
      behavior: "smooth"
    })
  };

  searchError = errorMessage => this.setState({
    errorMessage: errorMessage || "Error trying to fetch properties",
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
      this.searchError();
    }
    this.scrollToSearchResults();
  };

  searchProperties = async query => {
    try {
      const sanitizedQuery = {};
      Object.entries(query).forEach(([field, value]) => {
        if (value !== "") {
          sanitizedQuery[field] = value;
        }
      });
      if (Object.keys(sanitizedQuery).length < 2 && sanitizedQuery.locations.length < 1) {
        this.scrollToSearchResults();
        return this.searchError("Must have at least one search parameter");
      }
      const response = await axios.post("/properties/search", sanitizedQuery);
      const properties = response.data;
      const successMessage = properties.length ? "" : "No properties for search query";
      this.setState({properties, successMessage, errorMessage: ""});
    } catch (error) {
      console.error("Error searching for properties", error);
      this.searchError();
    }
    this.scrollToSearchResults();
  };

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
      <div ref={this.searchResultsRef}>
        {this.state.properties.map(property =>
          <PropertySummary key={property._id} {...property}/>)
        }
      </div>
    </main>;
  }
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