import React from 'react'

import MuiEditableTable from 'mui-editable-table'

const columns = [
  {
    title: 'Tab',
    fieldName: 'tab',
    inputType: 'TextField'
  },
  {
    title: 'Button label',
    fieldName: 'label',
    inputType: 'TextField'
  },
  {
    title: 'Button action',
    fieldName: 'action',
    inputType: 'TextField'
  }
]

export default class ButtonSetting extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(rowData) {
    let newButton = {}
    rowData.forEach((item) => {
      if (!newButton.hasOwnProperty(item.tab)) {
        newButton[item.tab] = []
      }
      newButton[item.tab].push({ label: item.label, action: item.action })
    })
    this.props.onChange && this.props.onChange(newButton)
  }
  
  render() {
    const settings = this.props.buttonSetting;
    const data = Object.keys(settings).map((tab) => (
      settings[tab].map((item) => (
        {
          'tab': tab,
          'label': item.label,
          'action': item.action
        }
      ))
    )).flat()
    return <>
      <MuiEditableTable colSpec={columns} rowData={data} onChange={this.onChange}/>
    </>
  }
}