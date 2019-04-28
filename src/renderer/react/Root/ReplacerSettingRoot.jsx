import React from 'react'
import ReplacerSetting from '../Components/ReplacerSetting.jsx'

export default class ReplacerSettingRoot extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <>
        <div>
          <ReplacerSetting replacerSetting={this.props.replacerSetting} onChange={this.props.onChange}/>
        </div>
        <hr />
      </>
    )
  }
}