import React from 'react'
import ReactDOM from 'react-dom'
import Root from './react/components/Root.jsx'

module.exports = function loadComponent(componentName, element) {
  const component = {
    "Root": Root
  }[componentName]
  ReactDOM.render(React.createElement(component), element)
}