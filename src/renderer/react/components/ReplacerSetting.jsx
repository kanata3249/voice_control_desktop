import React from 'react'

import MuiEditableTable from 'mui-editable-table'

const columns = [
  {
    title: 'Target application',
    fieldName: 'application',
    inputType: 'TextField'
  },
  {
    title: 'Input Text',
    fieldName: 'input',
    inputType: 'TextField'
  },
  {
    title: 'Replaced Text',
    fieldName: 'output',
    inputType: 'TextField'
  }
]

export default class ReplacerSetting extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(rowData) {
    let newReplacer = {}
    rowData.forEach((item) => {
      if (!newReplacer.hasOwnProperty(item.application)) {
        newReplacer[item.application] = []
      }
      newReplacer[item.application].push({ key: item.input, value: item.output })
    })
    this.props.onChange && this.props.onChange(newReplacer)
  }
  
  render() {
    const settings = this.props.replacer;
    const data = Object.keys(settings).map((targetApplication) => (
      settings[targetApplication].map((item) => (
        {
          'application': targetApplication,
          'input': item.key,
          'output': item.value
        }
      ))
    )).flat()
    return <>
      <MuiEditableTable colSpec={columns} rowData={data} onChange={this.onChange}/>
    </>
  }
}