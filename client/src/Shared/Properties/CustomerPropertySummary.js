import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropertySummary from "./PropertySummary";


export default class OwnerPropertySummary extends PropertySummary {
  constructor(props) {
    super(props);
    this.actionRow = <div className="pull-right">
      <button
        type="button"
        onClick={() => this.props.onAddToVisitingList(this.props._id)}>
        Add to Vising List <FontAwesomeIcon icon="plus"/>
      </button>
    </div>
  }
}