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
    let newButton = { tab: [] }
    rowData.forEach((item) => {
      let index = newButton.tab.findIndex((element) => element.label == item.tab)
      if (index == -1) {
        index = newButton.tab.push({ label: item.tab, buttons: [] }) - 1
      }
      newButton.tab[index].buttons.push({ label: item.label, action: item.action })
    })
    this.props.onChange && this.props.onChange(newButton)
  }
  
  render() {
    const settings = this.props.buttonSetting;
    const data = settings.tab.map((tab) => (
      tab.buttons.map((item) => (
        {
          'tab': tab.label,
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