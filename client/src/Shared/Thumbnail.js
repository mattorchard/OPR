import React from "react";
import Modal from "react-modal";
import {DynamicSizedModal} from "./Constants";

export default class Thumbnail extends React.Component {
  state = {
    open: false
  };

  render() {
    return <React.Fragment>
      <img
        src={`/photos/${this.props.photoId}`}
        onClick={() => this.setState({open: true})}
        />
      <Modal
        contentLabel="Image"
        isOpen={this.state.open}
        onRequestClose={() => this.setState({open: false})}
        style={DynamicSizedModal}>
        <img src={`/photos/${this.props.photoId}`}/>
      </Modal>
    </React.Fragment>
  }
}