import React from 'react'

import MuiEditableTable from 'mui-editable-table'

const columns = [
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
    let newReplacers = []
    rowData.forEach((item) => {
      newReplacers.push({ key: item.input, value: item.output })
    })
    this.props.onChange && this.props.onChange({ replacers: newReplacers })
  }
  
  render() {
    const settings = this.props.replacerSetting.replacers || [];
    const data = settings.map((item) => (
        {
          'input': item.key,
          'output': item.value
        }
    ))
    return <>
      <MuiEditableTable colSpec={columns} rowData={data} onChange={this.onChange}/>
    </>
  }
}