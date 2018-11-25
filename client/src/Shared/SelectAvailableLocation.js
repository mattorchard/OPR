import React from "react";
const availableLocations = ["Ottawa", "Toronto", "Cobourg"];

export default class SelectAvailableLocation extends React.Component {

  componentDidMount() {
    this.props.onChange({target: {name: this.props.name, value: availableLocations[0]}})
  }

  render() {
    return <select name={this.props.name} onChange={this.props.onChange} className="rounded-input">
      {availableLocations.map(location =>
        <option key={location} value={location}>{location}</option>
      )}
    </select>
  }
}