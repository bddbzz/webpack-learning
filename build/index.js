const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const path = require("path")

const config = require("../webpack.config.js")
const compiler = webpack(config)
const app = express()

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    //writeToDisk: true
}))

app.use(webpackHotMiddleware(compiler, {

}))


const PORT = 4000

const staticDir = path.join(__dirname, "../dist")
app.use(express.static(staticDir))

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})