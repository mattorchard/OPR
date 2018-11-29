import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import PropertySummary from "./PropertySummary";
import ConfirmationModal from "../ConfirmationModal";

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
        <ConfirmationModal
          contentLabel="Confirm Delete Property"
          message="Are you sure you want to delete this property?"
          onConfirm={this.deleteProperty}>
          <button
            type="button"
            aria-label="Delete"
            title="Delete Property">
            <FontAwesomeIcon icon="trash-alt"/>
          </button>
        </ConfirmationModal>
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
      const message = (error.response && error.response.data) || "Unable to delete property";
      this.setState({errorMessage: message, successMessage: ""});
    }
    this.props.onUpdate();
  };

}