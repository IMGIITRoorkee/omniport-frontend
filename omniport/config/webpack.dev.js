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
        // Third-party
        'tinymce',

        // Root views
        '/manifest',
        '/ensure_csrf',

        // Kernel
        '/kernel',

        // Authentication
        '/base_auth',
        '/session_auth',
        '/open_auth',
        '/token_auth',

        // Core components
        '/omnipotence',
        '/bootstrap',

        // Files
        '/branding',
        '/static',
        '/media',
        '/personal',

        // Services and apps
        '/api',

        // Websockets
        '/ws'
      ].map(path => {
        // This django${PORT} reference only works in Docker
        // If not using Docker, replace it with the actual URL of the backend
        return [path, `http://django${PROXY}:${PROXY}`]
      })
    ),
    hot: true,
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
