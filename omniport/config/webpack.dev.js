const fromPairs = require('lodash/fromPairs')

const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const PROXY = process.env.PROXY

// Merge the Webpack common config and the new dictionary, thus creating a dev config
module.exports = merge(common, {
  // context: path.join(__dirname, "./"),
  mode: 'development',

  devServer: {
    proxy: fromPairs(
      [
        // Kernel
        '/kernel',

        // Authentication
        '/base_auth',
        '/session_auth',
        '/open_auth',
        '/token_auth',

        // Core components
        '/branding',
        '/bootstrap',
        '/omnipotence',

        // Files
        '/static',
        '/media',
        '/personal',

        // Services and apps
        '/api'
      ].map(path => {
        // This django${PORT} reference only works in Docker
        // If not using Docker, replace it with the actual URL of the backend
        return [path, `http://django${PROXY}:${PROXY}`]
      })
    ),
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
