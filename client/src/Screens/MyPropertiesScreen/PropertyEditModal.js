import React from "react";
import Modal from "react-modal";
import {DynamicSizedModal} from "../../Shared/Constants";
import PropertyDetailsForm from "../../Shared/Properties/PropertyDetailsForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class PropertyEditModal extends React.Component {
  state = {
    open: false
  };

  open = () => this.setState({open: true});

  close = () => this.setState({open: false});

  submit = propertyInfo => {
    debugger;
    this.close();
  };

  render() {
    return <React.Fragment>
      <button
        type="button"
        aria-label="Edit"
        title="Edit Property"
        onClick={this.open}>
        <FontAwesomeIcon icon="edit"/>
      </button>
      <Modal contentLabel="Edit Property"
             isOpen={this.state.open}
             onRequestClose={this.close}
             style={DynamicSizedModal}>
        <h2>Edit Property</h2>
        <PropertyDetailsForm onSubmit={this.submit} property={this.props.property} forEdit={true}>
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