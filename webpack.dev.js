const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    publicPath: 'http://localhost:9012/',
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/
  },
}); 
