const merge = require('webpack-merge');
const dev = require('./webpack.dev.js');

// Merge the Webpack dev config and the new dictionary, thus creating a prod config
module.exports = merge(dev, {
  mode: 'production'
});
