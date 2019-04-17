import React from 'react'

export default class Root extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <h1>
          Hello
          <span className="electron-color">Electron!!</span>
          <span className="react-color">React!!</span>
          <span className="babel-color">Babel!!</span>
          <span className="webpack-color">Webpack!!</span>
        </h1>
      </div>
    )
  }
}
