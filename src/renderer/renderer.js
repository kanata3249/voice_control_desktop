import React from 'react'
import ReactDOM from 'react-dom'

import NetworkSettingRoot from './react/Root/NetworkSettingRoot.jsx'
import ReplacerSettingRoot from './react/Root/ReplacerSettingRoot.jsx'
import ButtonSettingRoot from './react/Root/ButtonSettingRoot.jsx'
import TargetTypeSelection from './react/Components/TargetTypeSelection.jsx'
import QrCode from './react/Components/QrCode.jsx'
import { ImportButton, ExportButton, SettingButton } from './react/Components/IconButton.jsx'

import './assets/css/main.scss'
import './../../node_modules/electron-tabs/electron-tabs.css'

export const Messages = require('./Messages').default

let refreshKey = 0

export const loadComponent = (componentName, element, props) => {
  const component = {
    'NetworkSettingRoot': NetworkSettingRoot,
    'ReplacerSettingRoot': ReplacerSettingRoot,
    'ButtonSettingRoot': ButtonSettingRoot,
    'TargetTypeSelection': TargetTypeSelection,
    'QrCode': QrCode,
    'ImportButton': ImportButton,
    'ExportButton': ExportButton,
    'SettingButton': SettingButton,
  }[componentName]
  if (props.key == "refresh") {
    // for force re-construct
    props.key = refreshKey++
  }
  ReactDOM.render(React.createElement(component, props), element)
}