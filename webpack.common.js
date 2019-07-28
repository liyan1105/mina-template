const path = require('path');
const minaPlugin = require('mini-program-webpack-loader').plugin;
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: path.resolve('./src/app.json'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].wxss',
              useRelativePath: true,
              context: path.resolve('src')
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.wxml$/,
        include: /src/,
        use: [
          {
            loader: 'wxml-loader',
            options: {
              root: path.resolve('./src'),
              enforceRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.json|\.wxml/,
        type: 'javascript/auto',
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            useRelativePath: true,
            context: path.resolve('src')
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.wxss', '.json']
  },
  plugins: [
    new minaPlugin({
      forPlugin: false
    }),
    new copyPlugin([
      { from: path.resolve('project.config.json'), to: path.resolve('./dist') }
    ])
  ]
};
