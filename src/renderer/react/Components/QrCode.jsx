import React from 'react'
const qrcode = require('qrcode-generator')

export default class QrCode extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const typeNumber = this.props.type || 4
    const errorCorrectionLevel = this.props.errorCorrectionLevel || 'L'
    const cellSize = this.props.cellSize || 4
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(this.props.text);
    qr.make();
  
    return (
      <img src={qr.createDataURL(cellSize)}></img>
    )
  }
}