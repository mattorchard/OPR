import React from "react";
import ReactForm from "../../Shared/ReactForm";
import {availableLocations} from "../../Shared/Constants";

export default class SearchPropertyForm extends ReactForm {

  state = {
    bedrooms: "",
    bathrooms: "",
    otherRooms: "",
    minimumRent: "",
    maximumRent: "",
    type: "",
    locations: []
  };

  selectLocation = event => {
    const {value, checked} = event.target;
    if (checked) {
      this.setState(oldState => oldState.locations.push(value) && oldState);
    } else {
      this.setState(oldState => {
        oldState.locations = oldState.locations.filter(location => location !== value);
        return oldState;
      });
    }
  };

  submit = event => {
    event.preventDefault();
    const query = {...this.state};
    if (this.state.locations.length === availableLocations.length) {
      query.locations = [];
    }
    this.props.onSubmit(query);
  };

  render() {
    return <form className="vertical-form card card--padded" onSubmit={this.submit}>
      <h2>Advanced Search</h2>
      <fieldset>
        <legend>Locations</legend>
        {availableLocations.map(location => <label key={location}>
          <input
            value={location}
            type="checkbox"
            name={location}
            onChange={this.selectLocation}
          />{location}</label>)}
      </fieldset>

      <fieldset>
        <legend>Type</legend>
        <label>
          <input type="radio"
                 name="type"
                 value="house"
                 onChange={this.handleInputChange}/>
          House
        </label>
        <label>
          <input type="radio"
                 name="type"
                 value="apartment"
                 onChange={this.handleInputChange}/>
          Apartment
        </label>
        <label>
          <input type="radio"
                 name="type"
                 value=""
                 defaultChecked={true}
                 onChange={this.handleInputChange}/>
          Both
        </label>
      </fieldset>

      <fieldset className="vertical-form">
        <legend>Rooms</legend>
        <label>
          Number of Bathrooms:
          <input name="bathrooms"
                 type="number"
                 className="rounded-input"
                 value={this.state.bathrooms}
                 onChange={this.handleInputChange}/>
        </label>
        <label>
          Number of Bedrooms:
          <input name="bedrooms"
                 type="number"
                 className="rounded-input"
                 value={this.state.bedrooms}
                 onChange={this.handleInputChange}/>
        </label>
        <label>
          Number of Other Rooms:
          <input name="otherRooms"
                 type="number"
                 className="rounded-input"
                 value={this.state.otherRooms}
                 onChange={this.handleInputChange}/>
        </label>
      </fieldset>

      <fieldset className="vertical-form">
        <legend>Rent</legend>
        <label>
          Minimum Rent:
          <input name="minimumRent"
                 type="number"
                 className="rounded-input"
                 value={this.state.minimumRent}
                 onChange={this.handleInputChange}/>
        </label>
        <label>
          Maximum Rent:
          <input name="maximumRent"
                 type="number"
                 className="rounded-input"
                 value={this.state.maximumRent}
                 onChange={this.handleInputChange}/>
        </label>

      </fieldset>
      <button type="submit">Search</button>
    </form>
  }
}