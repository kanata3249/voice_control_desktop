import React from 'react'
import ReactDOM from 'react-dom'

export default class Root extends React.Component {
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
//ReactDOM.render(<Root />, document.getElementById('root'))