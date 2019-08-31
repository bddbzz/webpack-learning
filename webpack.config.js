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
        },{
            test: /\.js$/,
            use: 'babel-loader'
        },{
            test: /\.css$/,
            use: 'css-loader'
        }]
    },
    plugins:[

    ],
    mode: 'none'
}