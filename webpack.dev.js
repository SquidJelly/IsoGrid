const path = require('path')
const { merge } = require('webpack-merge')  
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
      },
    port: 8080,
    hot: true
  }
})