import React from 'react'
import ReplacerSetting from '../components/ReplacerSetting.jsx'

export default class ReplacerSettingRoot extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <>
        <div>
          <ReplacerSetting replacer={this.props.replacer} onChange={this.props.onChange}/>
        </div>
        <hr />
      </>
    )
  }
}