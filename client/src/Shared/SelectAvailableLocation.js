import React from "react";
import {availableLocations} from "./Constants";

export default class SelectAvailableLocation extends React.Component {


  render() {
    if (this.props.disabled) {
      return <p><strong>{this.props.defaultValue}</strong></p>
    } else {
      return <select
        name={this.props.name}
        onChange={this.props.onChange}
        className="rounded-input"
        defaultValue=""
        required>
        <option value="" disabled style={{display: "none"}}/>
        {availableLocations.map(location =>
          <option
            key={location}
            value={location}>
            {location}
          </option>
        )}
      </select>
    }
  }
}