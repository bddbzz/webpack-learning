const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")

const config = require("../webpack.config.js")
const compiler = webpack(config)
const app = express()

app.use(webpackDevMiddleware(compiler,{
    publicPath: config.output.path
})) 

app.listen(3000,function(){
    console.log("App listening on port 3000!")
})