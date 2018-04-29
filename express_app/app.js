/*
* app.js -- Express server static files
* */

const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(app)

app.configure(() => {
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  // 把静态文件之后添加路由中间件
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

app.get('/', (req, res) => {
  res.redirect('/spa.html')
})

// 模拟get
app.get('/user/list', (req, res) => {
  res.contentType('json')
  res.send({ title: 'user list' })
})

// 模拟post
app.post('/user/create', (req, res) => {
  res.contentType('json')
  res.send({ title: 'user created' })
})

// 添加创建用户对象的路由
app.get('/user/read/:id([0-9]+)', (req, res) => {
  res.contentType('json')
  res.send({
    title: `user with id ${req.params.id} found`
  })
})

server.listen(3004)

console.log(`
Express server listening on port %d in %s mode,
${server.address().port}, ${app.settings.env}
`)
