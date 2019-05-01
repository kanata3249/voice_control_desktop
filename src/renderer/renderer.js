import React from 'react'
import ReactDOM from 'react-dom'

import Root from './react/Root/Root.jsx'
import ReplacerSettingRoot from './react/Root/ReplacerSettingRoot.jsx'
import ButtonSettingRoot from './react/Root/ButtonSettingRoot.jsx'
import TargetTypeSelection from './react/Components/TargetTypeSelection.jsx'
import QrCode from './react/Components/QrCode.jsx'
import { ImportButton, ExportButton } from './react/Components/IconButton.jsx'

import './assets/css/main.scss'
import './../../node_modules/electron-tabs/electron-tabs.css'

let refreshKey = 0

export const loadComponent = (componentName, element, props) => {
  const component = {
    'Root': Root,
    'ReplacerSettingRoot': ReplacerSettingRoot,
    'ButtonSettingRoot': ButtonSettingRoot,
    'TargetTypeSelection': TargetTypeSelection,
    'QrCode': QrCode,
    'ImportButton': ImportButton,
    'ExportButton': ExportButton,
  }[componentName]
  if (props.key == "refresh") {
    // for force re-construct
    props.key = refreshKey++
  }
  ReactDOM.render(React.createElement(component, props), element)
}