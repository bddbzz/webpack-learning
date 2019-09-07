'use strict';

let path = require('path')

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
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
                    limit: 10240
                }
            }]
        }, {
            test: /\.(woff2|woff|eot|ttf|otf)$/,
            use: 'file-loader'
        }]
    },
    plugins: [

    ],
    mode: 'none'
}