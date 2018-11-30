import React from "react";
import ReactForm from "../ReactForm";
import SelectAvailableLocation from "../SelectAvailableLocation";

export default class PropertyDetailsForm extends ReactForm {
  constructor(props) {
    super(props);
    if (props.property) {
      const {
        type,
        location,
        bedrooms,
        bathrooms,
        otherRooms,
        rent
      } = props.property;
      const {
        country,
        provinceOrState,
        city,
        postalCode,
        streetName,
        streetNumber,
        unitNumber
      } = props.property.address;
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
      this.initialType = type;
      this.initialLocation = location;
    } else {
      this.state = {
        type: "house",
        location: "",
        bedrooms: "",
        bathrooms: "",
        otherRooms: "",
        rent: "",
        country: "",
        provinceOrState: "",
        city: "",
        postalCode: "",
        streetName: "",
        streetNumber: "",
        unitNumber: ""
      };
    }
  }

  submit = event => {
    event.preventDefault();
    const {type, location, bedrooms, bathrooms, otherRooms, rent, ...address} = this.state;
    const property = {type, location, bedrooms, bathrooms, otherRooms, rent, address};
    if (this.props.forEdit) {
      property._id = this.props.property._id;
    }
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
                 defaultChecked={this.initialType === "house"}
                 disabled={this.props.forEdit}
                 onChange={this.handleInputChange}/>
          House
        </label>
        <label>
          <input type="radio"
                 name="type"
                 value="apartment"
                 required
                 defaultChecked={this.initialType === "apartment"}
                 disabled={this.props.forEdit}
                 onChange={this.handleInputChange}/>
          Apartment
        </label>
      </fieldset>
      <div style={{display: "flex"}}>
        <fieldset className="vertical-form" disabled={this.props.forEdit}>
          <legend>Address</legend>
          <label>
            Country
            <input name="country"
                   className="rounded-input"
                   type="text"
                   required
                   value={this.state.country}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Province / State
            <input name="provinceOrState"
                   className="rounded-input"
                   type="text"
                   required
                   value={this.state.provinceOrState}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            City
            <input name="city"
                   className="rounded-input"
                   type="text"
                   required
                   value={this.state.city}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Postal Code
            {/*Todo: Add Validator*/}
            <input name="postalCode"
                   className="rounded-input"
                   type="text"
                   required
                   value={this.state.postalCode}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Street Name
            <input name="streetName"
                   className="rounded-input"
                   type="text"
                   required
                   value={this.state.streetName}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Street Number
            <input name="streetNumber"
                   className="rounded-input"
                   type="number"
                   required
                   value={this.state.streetNumber}
                   onChange={this.handleInputChange}/>
          </label>
          {this.state.type === "apartment" && <label>
            Unit Number
            <input name="unitNumber"
                   className="rounded-input"
                   type="number"
                   required
                   value={this.state.unitNumber}
                   onChange={this.handleInputChange}/>
          </label>}
        </fieldset>

        <fieldset className="vertical-form">
          <legend>Property Details</legend>
          <label>
            Location
            <SelectAvailableLocation
              disabled={this.props.forEdit}
              defaultValue={this.initialLocation}
              name="location"
              onChange={this.handleInputChange}/>
          </label>

          <label>
            Rent: (per month)
            <input name="rent"
                   type="number"
                   className="rounded-input"
                   required
                   value={this.state.rent}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Number of Bathrooms:
            <input name="bathrooms"
                   type="number"
                   className="rounded-input"
                   required
                   value={this.state.bathrooms}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Number of Bedrooms:
            <input name="bedrooms"
                   type="number"
                   className="rounded-input"
                   required
                   value={this.state.bedrooms}
                   onChange={this.handleInputChange}/>
          </label>
          <label>
            Number of Other Rooms:
            <input name="otherRooms"
                   type="number"
                   className="rounded-input"
                   required
                   value={this.state.otherRooms}
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