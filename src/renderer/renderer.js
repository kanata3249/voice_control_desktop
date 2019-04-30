import React from 'react'
import ReactDOM from 'react-dom'

import Root from './react/Root/Root.jsx'
import ReplacerSettingRoot from './react/Root/ReplacerSettingRoot.jsx'
import ButtonSettingRoot from './react/Root/ButtonSettingRoot.jsx'
import TargetTypeSelection from './react/Components/TargetTypeSelection.jsx'
import QrCode from './react/Components/QrCode.jsx'

import './assets/css/main.scss'
import './../../node_modules/electron-tabs/electron-tabs.css'


export const loadComponent = (componentName, element, props) => {
  const component = {
    "Root": Root,
    "ReplacerSettingRoot": ReplacerSettingRoot,
    "ButtonSettingRoot": ButtonSettingRoot,
    "TargetTypeSelection": TargetTypeSelection,
    "QrCode": QrCode,
  }[componentName]
  ReactDOM.render(React.createElement(component, props), element)
}