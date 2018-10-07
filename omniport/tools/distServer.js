// This file configures a web server for locally testing the production build

const browserSync = require('browser-sync')
const historyApiFallback = require('connect-history-api-fallback')
const chalk = require('chalk')

const chalkProcessing = chalk.blue

console.log(chalkProcessing('Opening production build...'))

// Run BrowserSync
browserSync({
  port: 4000,
  ui: {
    port: 4001
  },
  server: {
    baseDir: 'build'
  },

  files: ['src/*.html'],

  middleware: [historyApiFallback()]
})
