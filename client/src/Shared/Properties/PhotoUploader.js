import React from "react";

export default class PhotoUploader extends React.Component {
  handleFileUpload = event => {
    const target = event.target;
    const file = target.files[0];
    this.props.onChange(file, this.props.index);
    event.preventDefault();
  };

  reset = () => {
    this.props.onReset(this.props.photoId, this.props.index);
  };


  render() {
    if (this.props.photoId) {
      return <div>
        <img
          src={`/photos/${this.props.photoId}`}
          height={100}
          width={200}
          alt=""
          className="upload-photo-preview"/>
        <button type="button" onClick={this.reset}>Reset</button>
      </div>
    } else {
      return <div>
        <input
          type="file"
          className="rounded-input"
          required
          onChange={this.handleFileUpload}/>
      </div>
    }
  }
}