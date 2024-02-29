import React from 'react'
import ReactCrop from 'react-image-crop'

import '../css/custom-cropper.css'

class CustomCropper extends React.PureComponent {
  render() {
    return (
      <ReactCrop {...this.props} />
    )
  }
}

export default CustomCropper
