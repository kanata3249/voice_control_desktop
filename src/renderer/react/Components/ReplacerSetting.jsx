import React from 'react'

import MuiEditableTable from 'mui-editable-table'
import Messages from '../../Messages'

export default class ReplacerSetting extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.columns = [
      {
        title: Messages.replacerSetting_column_input,
        fieldName: 'col-input',
        inputType: 'TextField',
        width: '40%'
      },
      {
        title: Messages.replacerSetting_column_replaced,
        fieldName: 'col-output',
        inputType: 'TextField',
        width: '50%'
      }
    ]
  }

  onChange(rowData) {
    let newReplacers = []
    rowData.forEach((item) => {
      newReplacers.push({ key: item['col-input'], value: item['col-output'] })
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
      <MuiEditableTable colSpec={this.columns} rowData={data} reorderable={true} onChange={this.onChange}/>
    </>
  }
}