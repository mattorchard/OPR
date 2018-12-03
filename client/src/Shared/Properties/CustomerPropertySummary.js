import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropertySummary from "./PropertySummary";


export default class CustomerPropertySummary extends PropertySummary {
  constructor(props) {
    super(props);
    this.actionRow = <div className="pull-right">
      <button
        type="button"
        disabled={this.props.tooExpensive}
        title={this.props.tooExpensive ?
          "Rent above maximum rent" :
          "Add to visiting list"}
        onClick={() => this.props.onAddToVisitingList(this.props._id)}>
        Add to Vising List <FontAwesomeIcon icon="plus"/>
      </button>
    </div>
  }
}