'use strict';

const path = require('path')
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let baseWebpackConfig = {
    entry: {
        index: ['./src/index.js'],
        search: ['./src/search.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js',
        publicPath: "/assets/"
    },
    module: {
        rules: [{
            test: /\.txt$/,
            use: 'raw-loader'
        }, {
            test: /\.js$/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']//'style-loader'
        }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']//'style-loader'
        }, {
            test: /\.(png|jpg|gif|jpeg|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name]_[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.(woff2|woff|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash:8].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        })
    ],
    mode: 'production'
}
module.exports = baseWebpackConfig