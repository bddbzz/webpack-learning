'use strict';

const path = require('path')
const webpack = require("webpack")
const glob = require('glob')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const setMPA = () => {
    let entry = {}
    let htmlWebpackPlugins = []
    let entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
    entryFiles.forEach((entryFile) => {
        let match = entryFile.match(/src\/(.*?)\/index\.js$/)
        let pageName = match && match[1]
        if (!pageName) {
            return
        }
        entry[pageName] = entryFile
        htmlWebpackPlugins.push(new HTMLWebpackPlugin({
            template: path.resolve(__dirname, `src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: ['vendors', pageName],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            }
        }))
    })

    return {
        entry,
        htmlWebpackPlugins
    }
}
let {
    entry,
    htmlWebpackPlugins
} = setMPA()
let baseWebpackConfig = {
    entry,
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
       ...htmlWebpackPlugins,
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