import React, {Component} from "react";
import Modal from "react-modal";
import {DynamicSizedModal} from "../../Shared/Constants";
import PropertyDetailsForm from "../../Shared/Properties/PropertyDetailsForm";


export default class AddPropertyDialog extends Component {
  state = {
    open: false
  };

  open = () => this.setState({open: true});

  close = () => this.setState({open: false});

  submit = propertyInfo => {
    this.props.onSubmit(propertyInfo);
    this.close();
  };

  render() {
    return <React.Fragment>
      <button
        onClick={this.open}
        type="button"
        className="btn">
        Add Property
      </button>
      <Modal contentLabel="Add Property"
             isOpen={this.state.open}
             onRequestClose={this.close}
             appElement={document.body}
             style={DynamicSizedModal}>
        <h2>Add Property</h2>
        <PropertyDetailsForm onSubmit={this.submit}>
          <button onClick={this.close}
                  className="btn btn-danger"
                  type="reset">
            Cancel
          </button>
        </PropertyDetailsForm>
      </Modal>
    </React.Fragment>
  }
}