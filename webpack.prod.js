'use strict';

const path = require('path')
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const HTMLWebpackExternalsPlugin = require('html-webpack-externals-plugin')
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
            chunks: [pageName],
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
let { entry, htmlWebpackPlugins } = setMPA()

let baseWebpackConfig = {
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js',
        //publicPath: "assets/"
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
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [
                        require('autoprefixer')()
                    ]
                }
            }, {
                loader: 'px2rem-loader',
                options: {
                    remUnit: 75,
                    remPrecision: 8
                }
            }]//'style-loader'
        }, {
            test: /\.(png|jpg|gif|jpeg|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'assets/[name]_[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.(woff2|woff|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'assets/[name]_[hash:8].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        ...htmlWebpackPlugins,
        new CleanWebpackPlugin(),
        new HTMLWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
                    global: 'ReactDOM',
                },
            ]
        })
    ],
    mode: 'production',
    devtool: 'none'
}
module.exports = baseWebpackConfig