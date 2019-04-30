import React from 'react'
import ButtonSetting from '../Components/ButtonSetting.jsx'

export default class ButtonSettingRoot extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ButtonSetting buttonSetting={this.props.buttonSetting} onChange={this.props.onChange}/>
    )
  }
}