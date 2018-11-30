import React from "react";

const availableLocations = ["Ottawa", "Toronto", "Cobourg"];

export default class SelectAvailableLocation extends React.Component {


  render() {
    if (this.props.disabled) {
      return <p><strong>{this.props.defaultValue}</strong></p>
    } else {
      return <select name={this.props.name} onChange={this.props.onChange} className="rounded-input">
        {availableLocations.map(location =>
          <option
            defaultValue={this.props.defaultValue || availableLocations[0]}
            key={location}
            value={location}>
            {location}
          </option>
        )}
      </select>
    }
  }
}