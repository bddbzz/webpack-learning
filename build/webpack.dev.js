const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.app');

const config = {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]_[hash:8].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
  },
  /*     watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    } */
};
module.exports = webpackMerge(baseConfig, config);
