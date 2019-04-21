import React from 'react'
import ReactDOM from 'react-dom'

import Root from './Root/Root.jsx'
import ReplacerSettingRoot from './Root/ReplacerSettingRoot.jsx'
import ButtonSettingRoot from './Root/ButtonSettingRoot.jsx'

export const loadComponent = (componentName, element, props) => {
  const component = {
    "Root": Root,
    "ReplacerSettingRoot": ReplacerSettingRoot,
    "ButtonSettingRoot": ButtonSettingRoot
  }[componentName]
  ReactDOM.render(React.createElement(component, props), element)
}