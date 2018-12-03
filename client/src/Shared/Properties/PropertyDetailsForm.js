import React from "react";
import ReactForm from "../ReactForm";
import SelectAvailableLocation from "../SelectAvailableLocation";
import PhotoUploader from "./PhotoUploader";
import axios from "axios";

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
        rent,
        photoIds
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
        unitNumber,
        photoIds
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
        unitNumber: "",
        photoIds: new Array(5).fill(null)
      };
    }
  }

  submit = event => {
    event.preventDefault();
    const {type, location, bedrooms, bathrooms, otherRooms, rent, photoIds, ...address} = this.state;
    const property = {type, location, bedrooms, bathrooms, otherRooms, rent, address, photoIds};
    if (this.props.forEdit) {
      property._id = this.props.property._id;
    }
    this.props.onSubmit(property);
  };

  handlePhotoUpload = async (file, index) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/photos", formData);
      const photoId = response.data;
      this.setState(oldState => {
        oldState.photoIds[index] = photoId;
        console.log("Updating image id to", photoId);
        return oldState;
      });
    } catch(error) {
      console.error(error);
    }
  };

  handlePhotoReset = async(photoId, index) => {
    this.setState(oldState => {
      oldState.photoIds[index] = null;
      return oldState;
    });
    try {
      await axios.delete(`/photos/${photoId}`);
    } catch (error) {
      console.error("Unable to delete photo", photoId, error);
    }
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
        <fieldset>
          <legend>Photos:</legend>
          {this.state.photoIds.map((photoId, index) =>
            <PhotoUploader
              key={`${index}-${photoId}`}
              index={index}
              photoId={photoId}
              onChange={this.handlePhotoUpload}
              onReset={this.handlePhotoReset}
            />
          )}
        </fieldset>
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
                   className="rounded-input custom-validator"
                   type="text"
                   required
                   pattern="(^[0-9]{5}(-[0-9]{4})?$)|(^[A-z][0-9][A-z][ -]?[0-9][A-z][0-9]$)"
                   value={this.state.postalCode}
                   onChange={this.handleInputChange}/>
            <p className="invalid-feedback alert-danger">
              Invalid postal code
            </p>
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