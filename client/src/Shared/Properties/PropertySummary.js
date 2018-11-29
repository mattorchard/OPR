import React from "react";
import {formatAddress, formatDate} from "../../Services/FormatService";
import Alert from "../Alert";


export default class PropertySummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errorMessage: "", successMessage: ""};
  }



  render() {
    return <div className="card">
      {this.actionRow}
      <ul>
        <li><strong>${this.props.rent}</strong>/mo</li>
        <li>Type: {this.props.type}</li>
        <li>Address: {formatAddress(this.props.address)}</li>
        <li>Location: {this.props.location}</li>
        {this.props.deletedOn &&
        <li>Deleted On: {formatDate(new Date(this.props.deletedOn))}</li>}
      </ul>
      <div>
        <Alert type="success">{this.state.successMessage}</Alert>
        <Alert type="danger">{this.state.errorMessage}</Alert>
      </div>
    </div>
  }
}