import React from 'react'

import Select  from 'react-select'
import Creatable  from 'react-select/lib/Creatable'

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
      this.props.readOnly ?
        <Creatable
          value={selectedOption}
          options={this.options}
          onChange={this.onChange}
        />
      :
        <Select
          value={selectedOption}
          options={this.options}
          onChange={this.onChange}
        />
    )
  }
}