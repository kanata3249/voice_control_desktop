import React from 'react'

import MuiEditableTable from 'mui-editable-table'

const columns = [
  {
    title: 'Tab',
    fieldName: 'col-tab',
    inputType: 'TextField',
    width: '20%'
  },
  {
    title: 'Button label',
    fieldName: 'col-label',
    inputType: 'TextField',
    width: '35%'
  },
  {
    title: 'Button action',
    fieldName: 'col-action',
    inputType: 'TextField',
    width: '35%'
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
    const settings = this.props.buttonSetting.tab || []
    const data = settings.map((tab) => {
      const buttons = tab.buttons || []
      return buttons.map((item) => (
        {
          'col-tab': tab.label,
          'col-label': item.label,
          'col-action': item.action
        }
      ))
    }).flat()
    return (
      <MuiEditableTable colSpec={columns} rowData={data} reorderable={true} onChange={this.onChange}/>
    )
  }
}