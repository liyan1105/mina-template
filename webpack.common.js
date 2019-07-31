const path = require('path');
const minaPlugin = require('mini-program-webpack-loader').plugin;
const fileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: path.resolve('./src/app.json'),
  output: {
    path: path.resolve('./dist')
  },
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
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            }
          },
          'less-loader'
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
        test: /\.(json|wxml)$/,
        type: 'javascript/auto',
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            useRelativePath: true,
            context: path.resolve('src')
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name][hash:8].[ext]',
              outputPath: 'images/'
            }
          }
        ]
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
    new fileManagerPlugin({
      onStart: {
        mkdir: [
          path.resolve('./built/')
        ]
      },
      onEnd: {
        copy: [
          {
            source: path.resolve('project.config.json'),
            destination: path.resolve('./dist')
          }
        ],
        move: [
          {
            source: path.resolve('./dist/images/'),
            destination: path.resolve('./built/images/')
          }
        ]
      }
    })
  ]
};
