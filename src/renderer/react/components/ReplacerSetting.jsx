import React from 'react'

export default class ReplacerSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      replacer: props.replacer
    }
  }

  render() {
    return(
      <>
        <span>Replacer Setting</span>
      </>
    )
  }
}