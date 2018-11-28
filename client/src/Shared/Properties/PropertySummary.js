import React from "react";
import {formatAddress} from "../../Services/AddressService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class PropertySummary extends React.Component {

  render() {
    return <div className="card">
      {this.props.owns &&
      <div className="pull-right">
        <button
          type="button"
          aria-label="Edit"
          title="Edit Property"
          onClick={this.props.onEdit}>
          <FontAwesomeIcon icon="edit"/>
        </button>
        <button
          type="button"
          aria-label="Delete"
          title="Delete Property"
          onClick={this.props.onEdit}>
          <FontAwesomeIcon icon="trash-alt"/>
        </button>
      </div>}
      <ul>
        <li><strong>${this.props.rent}</strong>/mo</li>
        <li>Type: {this.props.type}</li>
        <li>Address: {formatAddress(this.props.address)}</li>
        <li>Location: {this.props.location}</li>
      </ul>
    </div>
  }
}