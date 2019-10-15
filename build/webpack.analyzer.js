
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./webpack.prod');

config.plugins.push(new BundleAnalyzerPlugin());

const smw = new SpeedMeasureWebpackPlugin();

module.exports = smw.wrap(config);
