/*
* app.js - Express server with sample module
* */

// 完成通用的CRUD 路由
const http = require('http')
const express = require('express')
const routes = require('./routes') // 引入自定义路由模块
const app = express()

const server = http.createServer(app)

app.configure(() => {
  app.use(express.bodyParser()) // 对表单进行解码
  app.use(express.methodOverride()) // 创建RESTful 服务
  app.use(express.static(__dirname + '/public'))
  app.use(app.router)
})

app.configure('development', () => {
  app.use(express.logger())
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }))
})

app.configure('production', () => {
  app.use(express.errorHandler())
})

// --------- begin server configuration --------
routes.configRoutes(app, server) // 使用routes

// --------- end server configuration -------

server.listen(3007)

console.log(`
Express server listening on port %d in %s mode,
${server.address().port}, ${app.settings.env}
`)
