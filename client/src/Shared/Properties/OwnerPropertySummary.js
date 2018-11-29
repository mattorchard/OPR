import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import PropertySummary from "./PropertySummary";

export default class OwnerPropertySummary extends PropertySummary {
  constructor(props) {
    super(props);
    if (!this.props.deletedOn) {
      this.actionRow = <div className="pull-right">
        <button
          type="button"
          aria-label="Edit"
          title="Edit Property"
          onClick={this.editProperty}>
          <FontAwesomeIcon icon="edit"/>
        </button>
        <button
          type="button"
          aria-label="Delete"
          title="Delete Property"
          onClick={this.deleteProperty}>
          <FontAwesomeIcon icon="trash-alt"/>
        </button>
      </div>
    }
  }

  editProperty = async () => {
    console.log("Attempting to Edit")
  };

  deleteProperty = async () => {
    try {
      await axios.delete(`/properties/${this.props._id}`);
    } catch (error) {

    }
  };

}