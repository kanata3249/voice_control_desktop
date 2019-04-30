import React from 'react'

import MuiEditableTable from 'mui-editable-table'

const columns = [
  {
    title: 'Input Text',
    fieldName: 'col-input',
    inputType: 'TextField',
    width: '40%'
  },
  {
    title: 'Replaced Text',
    fieldName: 'col-output',
    inputType: 'TextField',
    width: '50%'
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
          'col-input': item.key,
          'col-output': item.value
        }
    ))
    return <>
      <MuiEditableTable colSpec={columns} rowData={data} reorderable={true} onChange={this.onChange}/>
    </>
  }
}