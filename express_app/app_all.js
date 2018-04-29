/*
* app_all.js - Express server with generic routing
* */

// 完成通用的CRUD 路由
const http = require('http')
const express = require('express')
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
app.get('/', (req, res) => {
  res.redirect('/spa.html')
})

// 使用app.all() 方法来设置通用属性
app.all('/:obj_type/*?', (req, res, next) => {
  res.contentType('json')
  next()
})

app.get('/user/list', (req, res) => {
  res.send({ title: 'user list' })
})

app.post('/user/create', (req, res) => {
  res.send({ title: 'user created' })
})

app.get('/user/read/:id([0-9]+)', (req, res) => {
  res.send({
    title: `user with id ${req.params.id} found`
  })
})

app.get('/user/update/:id([0-9]+)', (req, res) => {
  res.send({
    title: `user with id ${req.params.id} updated`
  })
})

app.get('/user/delete/:id([0-9]+)', (req, res) => {
    res.send({
    title: `user with id ${req.params.id} deleted`
  })
})

// --------- end server configuration -------

server.listen(3005)

console.log(`
Express server listening on port %d in %s mode,
${server.address().port}, ${app.settings.env}
`)
