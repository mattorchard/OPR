import React from "react";
import {DynamicSizedModal} from "./Constants";
import Modal from "react-modal";

export default class ConfirmationModal extends React.Component {
  state = {open: false};

  open = () => this.setState({open: true});

  close = () => this.setState({open: false});

  confirm = () => {
    this.props.onConfirm();
    this.close();
  };

  renderOpenButton = () => {
    return React.cloneElement( React.Children.only(this.props.children), { onClick: this.open });
  };

  render() {
    return <React.Fragment>
      {this.renderOpenButton()}
      <Modal contentLabel={this.props.contentLabel}
             isOpen={this.state.open}
             onRequestClose={this.close}
             style={DynamicSizedModal}>
        <h3>{this.props.title || this.props.contentLabel}</h3>
        <p>
          {this.props.message}
        </p>
        <button type="button" onClick={this.close}>
          Cancel
        </button>
        <button type="button" onClick={this.confirm}>
          {this.props.confirmLabel || "Confirm"}
        </button>
      </Modal>
    </React.Fragment>
  }
}