module.exports = {
  mode: 'development',
  entry: './src/renderer/renderer.js',
  target: 'electron-renderer',
  output: {
      path: `${__dirname}/src/renderer/bundle`,
    filename: 'renderer.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(c|le)ss$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
}