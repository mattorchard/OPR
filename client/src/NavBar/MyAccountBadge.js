import React, {Component} from "react";
import LogoutButton from "../Shared/LogoutButton";


export default class MyAccountBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.letter = this.props.givenName.charAt(0).toUpperCase();
  }

  render() {
    return <div className="my-account-badge">
      <button
        type="button"
        title={`${this.props.givenName} ${this.props.lastName}`}
        onClick={() => this.setState(oldState => ({open: !oldState.open}))}
        className={`my-account-badge__toggle avatar avatar--${this.props.role}`}>
        {this.letter}
      </button>
      <div className={`my-account-badge__popover my-account-badge__popover--${this.state.open ? "open" : "closed"}`}>
        <ul>
          <li>Signed in as: <strong>{this.props.username}</strong></li>
          <li>{this.props.givenName}</li>
          <li>{this.props.lastName}</li>
          <li>{this.props.role}</li>
          <li><LogoutButton/></li>
        </ul>
      </div>
    </div>
  }
}