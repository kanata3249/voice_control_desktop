import React from 'react'
import ReactDOM from 'react-dom'

import Root from './Root/Root.jsx'
import ReplacerSettingRoot from './Root/ReplacerSettingRoot.jsx'
import ButtonSettingRoot from './Root/ButtonSettingRoot.jsx'
import TargetTypeSelection from './Components/TargetTypeSelection.jsx'

import '../assets/css/main.less'
import '../../../node_modules/electron-tabs/electron-tabs.css'


export const loadComponent = (componentName, element, props) => {
  const component = {
    "Root": Root,
    "ReplacerSettingRoot": ReplacerSettingRoot,
    "ButtonSettingRoot": ButtonSettingRoot,
    "TargetTypeSelection": TargetTypeSelection,
  }[componentName]
  ReactDOM.render(React.createElement(component, props), element)
}