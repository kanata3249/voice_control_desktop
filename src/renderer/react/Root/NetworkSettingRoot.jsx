import React from 'react'

import TextField from '@material-ui/core/TextField'

import QrCode from '../Components/QrCode.jsx'

import Messages from '../../Messages'

export default class ButtonSettingRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state
  }

  onIPAddrChange(event) {
    const ipaddr = event.target.value

    this.props.onChange(ipaddr, this.props.port)
  }

  onPortNoChange(event) {
    const portNo = event.target.value

    this.props.onChange(this.props.ipaddr, portNo)
  }

  render() {
    const hostURL = `https://${this.props.ipaddr}:${this.props.port}`
    return(
      <>
        <div className="network-setting-form">
          <span className="schema">https://</span>
          <TextField
            id="ipaddr"
            className="ipaddr"
            label={Messages.networkSetting_ipaddr_label}
            value={this.props.ipaddr}
            margin="normal"
            variant="outlined"
            onChange={this.onIPAddrChange.bind(this)}
            />
          <span className="ipaddr-port-separator">:</span>
          <TextField
            id="port"
            className="port"
            label={Messages.networkSetting_port_label}
            value={this.props.port}
            margin="normal"
            variant="outlined"
            onChange={this.onPortNoChange.bind(this)}
            />
        </div>
        <div className="network-setting-result">
          <div>{Messages.networkSetting_qrcode_label}</div>
          <QrCode className="qrcode" text={hostURL} />
        </div>
      </>
    )
  }
}