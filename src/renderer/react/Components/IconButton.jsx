import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { CallMade, CallReceived, Settings } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip'
import Messages from '../../Messages'

export const ImportButton = (props) => {
  return (
    <Tooltip title={Messages.importButton_tooltip}>
      <IconButton onClick={props.onClick} size={props.size || 'small'}>
        <CallReceived />
      </IconButton>
    </Tooltip>
  )
}

export const ExportButton = (props) => {
  return (
    <Tooltip title={Messages.exportButton_tooltip}>
      <IconButton onClick={props.onClick} size={props.size || 'small'}>
        <CallMade />
      </IconButton>
    </Tooltip>
  )
}

export const SettingButton = (props) => {
  return (
    <Tooltip title={Messages.settingButton_tooltip}>
      <IconButton onClick={props.onClick} size={props.size || 'small'}>
        <Settings />
      </IconButton>
    </Tooltip>
  )
}
