const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

// Merge the Webpack common config and the new dictionary, thus creating a dev config
module.exports = merge(common, {
  // context: path.join(__dirname, "./"),
  mode: 'development',

  devServer: {
    proxy: {
      /*
        Proxy API requests to the backend to bypass CORS restrictions
        This URL will need to be changed but never commit the changes
       */
      '/path': 'https://domain:port'
    },
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false
    }
  }
})
