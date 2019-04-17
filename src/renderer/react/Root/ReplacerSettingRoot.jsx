import React from 'react'
import ReplacerSetting from '../components/ReplacerSetting.jsx'

export default class ReplacerSettingRoot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      replacer: props.replacer
    }
  }

  render() {
    return(
      <>
        <h1>Replacer Settings</h1>
        <div>
          <ReplacerSetting replacer={this.state.replacer}/>
        </div>
        <hr />
        <div>
          <button id='ok'>Ok</button>
          <button id='cancel'>Cancel</button>
        </div>
      </>
    )
  }
}