import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class RoomCountBadges extends React.Component {
  render() {
    return <div>
      <span className="room-count" aria-label="Number of bedrooms" title="Number of bedrooms">
        <FontAwesomeIcon icon="bed"/>{this.props.bedrooms}
      </span>

      <span className="room-count" aria-label="Number of bathrooms" title="Number of bathrooms">
        <FontAwesomeIcon icon="bath"/> {this.props.bathrooms}
        </span>

      <span className="room-count" aria-label="Number of other rooms" title="Number of other rooms">
        <FontAwesomeIcon icon="couch"/> {this.props.otherRooms}
      </span>
    </div>
  }
}