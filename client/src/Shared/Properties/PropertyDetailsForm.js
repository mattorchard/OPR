import React from "react";
import ReactForm from "../ReactForm";

export default class PropertyDetailsForm extends ReactForm {
  constructor(props) {
    super(props);
    const {type, rent, bathrooms, bedrooms, otherRooms} = props;
    this.state = {type, rent, bathrooms, bedrooms, otherRooms};
  }

  submit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return <form onSubmit={this.submit}
                 className="vertical-form">
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
      <label>
        Rent: (per month)
        <input name="rent"
               placeholder="500"
               type="number"
               className="rounded-input"
               required
               onChange={this.handleInputChange}/>
      </label>
      <label>
        Number of Bathrooms:
        <input name="bathrooms"
               placeholder="1"
               type="number"
               className="rounded-input"
               required
               onChange={this.handleInputChange}/>
      </label>
      <label>
        Number of Bedrooms:
        <input name="bedrooms"
               placeholder="2"
               type="number"
               className="rounded-input"
               required
               onChange={this.handleInputChange}/>

      </label>
      <label>
        Number of Other Rooms:
        <input name="otherRooms"
               placeholder="3"
               type="number"
               className="rounded-input"
               required
               onChange={this.handleInputChange}/>

      </label>
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