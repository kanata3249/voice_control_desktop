import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { CallMade, CallReceived } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip'

export const ImportButton = (props) => {
  return (
    <Tooltip title="Copy from Clipboard">
      <IconButton onClick={props.onClick} size={props.size || 'small'}>
        <CallReceived />
      </IconButton>
    </Tooltip>
  )
}

export const ExportButton = (props) => {
  return (
    <Tooltip title="Copy to Clipboard">
      <IconButton onClick={props.onClick} size={props.size || 'small'}>
        <CallMade />
      </IconButton>
    </Tooltip>
  )
}
