import React from 'react'
import ReactDOM from 'react-dom'

import Root from './Root/Root.jsx'
import ReplacerSettingRoot from './Root/ReplacerSettingRoot.jsx'

export const loadComponent = (componentName, element, props) => {
  const component = {
    "Root": Root,
    "ReplacerSettingRoot": ReplacerSettingRoot
  }[componentName]
  ReactDOM.render(React.createElement(component, props), element)
}