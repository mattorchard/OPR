import React from "react";
import ReactForm from "../ReactForm";
import SelectAvailableLocation from "../SelectAvailableLocation";

export default class PropertyDetailsForm extends ReactForm {
  constructor(props) {
    super(props);
    const {
      type,
      location,
      bedrooms,
      bathrooms,
      otherRooms,
      rent,
      country,
      provinceOrState,
      city,
      postalCode,
      streetName,
      streetNumber,
      unitNumber
    } = props;
    this.state = {
      type,
      location,
      bedrooms,
      bathrooms,
      otherRooms,
      rent,
      country,
      provinceOrState,
      city,
      postalCode,
      streetName,
      streetNumber,
      unitNumber
    };
  }

  submit = event => {
    event.preventDefault();
    const {type, location, bedrooms, bathrooms, otherRooms, rent, ...address} = this.state;
    const property = {type, location, bedrooms, bathrooms, otherRooms, rent, address};
    this.props.onSubmit(property);
  };

  render() {
    return <form onSubmit={this.submit}>
      <fieldset>
        <legend>Type:</legend>
        <label>
          <input type="radio"
                 name="type"
                 value="house"
                 required
                 onChange={this.handleInputChange}/>
          House
        </label>
        <label>
          <input type="radio"
                 name="type"
                 value="apartment"
                 required
                 onChange={this.handleInputChange}/>
          Apartment
        </label>
      </fieldset>
      <div style={{display: "flex"}}>
        <fieldset className="vertical-form">
          <legend>Address</legend>
          <label>
            Country
            <input name="country"
                   className="rounded-input"
                   type="text"
                   required
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Province / State
            <input name="provinceOrState"
                   className="rounded-input"
                   type="text"
                   required
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            City
            <input name="city"
                   className="rounded-input"
                   type="text"
                   required
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Postal Code
            {/*Todo: Add Validator*/}
            <input name="postalCode"
                   className="rounded-input"
                   type="text"
                   required
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Street Name
            <input name="streetName"
                   className="rounded-input"
                   type="text"
                   required
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Street Number
            <input name="streetNumber"
                   className="rounded-input"
                   type="number"
                   required
                   onChange={this.handleInputChange}/>
          </label>
          {this.state.type === "apartment" && <label>
            Unit Number
            {/*Todo: Required param*/}
            <input name="unitNumber"
                   className="rounded-input"
                   type="number"
                   onChange={this.handleInputChange}/>
          </label>}
        </fieldset>

        <fieldset className="vertical-form">
          <legend>Property Details</legend>
          <label>
            Location
            <SelectAvailableLocation name="location" onChange={this.handleInputChange}/>
          </label>

          <label>
            Rent: (per month)
            <input name="rent"
                   type="number"
                   className="rounded-input"
                   required
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Number of Bathrooms:
            <input name="bathrooms"
                   type="number"
                   className="rounded-input"
                   required
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Number of Bedrooms:
            <input name="bedrooms"
                   type="number"
                   className="rounded-input"
                   required
                   onChange={this.handleInputChange}/>

          </label>
          <label>
            Number of Other Rooms:
            <input name="otherRooms"
                   type="number"
                   className="rounded-input"
                   required
                   onChange={this.handleInputChange}/>

          </label>
        </fieldset>
      </div>
      <div>
        {this.props.children}
        <button
          type="submit"
          className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  }
}