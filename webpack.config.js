const path = require("path");
const minaPlugin = require("mini-program-webpack-loader").plugin;


module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: path.resolve("./src/app.json"),
  mode: process.env.NODE_ENV,
  module: {
    rules: [{
        test: /\.ts$/,
        include: /src/,
        use: [{
          loader: "ts-loader"
        }]
      },
      {
        test: /\.less$/,
        use: [{
            loader: "file-loader",
            options: {
              name: "[path][name].wxss",
              useRelativePath: true,
              context: path.resolve("src")
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.wxml$/,
        include: /src/,
        use: [{
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              useRelativePath: true,
              context: path.resolve("src")
            }
          },
          {
            loader: "wxml-loader",
            options: {
              root: path.resolve("./src"),
              enforceRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.json/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            useRelativePath: true,
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new minaPlugin({
      forPlugin: true
    })
  ]
};