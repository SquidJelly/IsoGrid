const { merge } = require('webpack-merge')  
const common = require('./webpack.common.js')
const TerserPlugin = require("terser-webpack-plugin");


module.exports = merge(common, {
  mode:'production',
  module: {
    rules: [{
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    }]
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: (astNode, comment) => false,
    })],
  },
})