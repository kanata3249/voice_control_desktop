import React from 'react'
import ReplacerSetting from '../Components/ReplacerSetting.jsx'

export default class ReplacerSettingRoot extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ReplacerSetting replacerSetting={this.props.replacerSetting} onChange={this.props.onChange}/>
    )
  }
}