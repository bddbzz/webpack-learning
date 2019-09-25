'use strict';

const path = require('path')
const webpack = require("webpack")

let baseWebpackConfig = {
    entry: {
        index: ['./src/index.js'],
        search: ['./src/search.js'] //'webpack-hot-middleware/client?reload=true',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[hash:8].js',
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
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(png|jpg|gif|jpeg|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024
                }
            }]
        }, {
            test: /\.(woff2|woff|eot|ttf|otf)$/,
            use: 'file-loader'
        }]
    },
    plugins: [
       new webpack.HotModuleReplacementPlugin(),
    ],
    mode: 'development',
    devServer:{
        contentBase: "./dist",
        hot: true
    },    
/*     watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    } */
}
module.exports = baseWebpackConfig