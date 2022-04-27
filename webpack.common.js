const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['./index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.min.[fullhash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlPlugin({
        file:path.join(__dirname,'dist','index.html'),
        template:'../public/index.html'
    })
  ]
}