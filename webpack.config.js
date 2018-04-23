/**
 * Created by summer on 2018/4/21.
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  // filename: "[name].[hash].css",
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    main: './assets/src/main.js'
  },
  output: {
    path: path.resolve(__dirname, "assets/dist"),
    publicPath: "./",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }, {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: 'url-loader?limit=50000&name=[path][name].[ext]'
      }, {
        test: /\.(gif|jpg|png|jpeg)\??.*$/,
        use: 'file-loader?name=img/[name].[ext]'
      }
    ]
  },
  plugins: [
    extractSass
  ],
  mode: 'development'
};