
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');

const config = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
    publicPath: '',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer()],
        },
      }, {
        loader: 'px2rem-loader',
        options: {
          remUnit: 75,
          remPrecision: 8,
        },
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    /* splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    test: /(react|react\-dom)/,
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 1
                }
            }
        } */
  },
};

module.exports = webpackMerge(baseConfig, config);
