import React from 'react'

import Select  from 'react-select'
import Creatable  from 'react-select/lib/Creatable'

import Messages from '../../Messages'

export default class TargetTypeSelection extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.options = props.targetTypes.map((label) => ({ value: label, label: label }))
    this.state = {
      selectedOption: { value: props.value, label: props.value }
    }
  }

  onChange(selectedOption) {
    this.setState( { selectedOption })
    this.props.onChange && this.props.onChange(selectedOption.value)
  }
  
  render() {
    const { selectedOption } = this.state
    return (
      this.props.readonly ?
        <Select
          value={selectedOption}
          options={this.options}
          onChange={this.onChange}
        />
      :
        <Creatable
          value={selectedOption}
          options={this.options}
          onChange={this.onChange}
          formatCreateLabel={(value) => `${Messages.targetType_new} ${value}`}
        />
    )
  }
}