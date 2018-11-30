import React, {Component} from "react";
import ReactForm from "../../Shared/ReactForm";
import SelectAvailableLocation from "../../Shared/SelectAvailableLocation";
import SearchPropertyForm from "../../Shared/Properties/SearchPropertiesForm";

export default class BrowsePropertiesScreen extends Component {
  render() {
    return <main>
      <h1>Browse Properties</h1>
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <SearchPropertyForm onSubmit={this.searchProperties}/>
        <LocationForm onSubmit={this.browsePropertiesByLocation}/>
      </div>
      <hr/>
      <div>
        Search results
      </div>
    </main>;
  }

  browsePropertiesByLocation = location => {
    debugger;
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