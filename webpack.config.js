module.exports = {
  mode: 'development',
  entry: './src/renderer/react/reactPages.js',
  target: 'electron-renderer',
  output: {
    path: `${__dirname}/bundle`,
    filename: 'renderer.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(c|le)ss$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
}