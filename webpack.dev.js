const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/
  },
}); 
