require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 主要用于接受后端hotMiddleware的通知，执行reload操作
hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})