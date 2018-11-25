import React, {PureComponent} from "react";


export default class Alert extends PureComponent {
  render() {
    if (this.props.children) {
      return <p
        className={`alert alert-${this.props.type}`}>
        {this.props.children}
      </p>
    } else {
      return ""
    }
  }
}