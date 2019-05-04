import React from 'react'

import MuiEditableTable from 'mui-editable-table'
import Messages from '../../Messages'

export default class ButtonSetting extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    
    this.columns = [
      {
        title: Messages.buttonSetting_column_tab,
        fieldName: 'col-tab',
        inputType: 'TextField',
        width: '20%'
      },
      {
        title: Messages.buttonSetting_column_label,
        fieldName: 'col-label',
        inputType: 'TextField',
        width: '35%'
      },
      {
        title: Messages.buttonSetting_column_action,
        fieldName: 'col-action',
        inputType: 'TextField',
        width: '35%'
      }
    ]
  }

  onChange(rowData) {
    let newButton = { tab: [] }
    rowData.forEach((item) => {
      let index = newButton.tab.findIndex((element) => element.label == item['col-tab'])
      if (index == -1) {
        index = newButton.tab.push({ label: item['col-tab'], buttons: [] }) - 1
      }
      newButton.tab[index].buttons.push({ label: item['col-label'], action: item['col-action'] })
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
      <MuiEditableTable colSpec={this.columns} rowData={data} reorderable={true} onChange={this.onChange}/>
    )
  }
}