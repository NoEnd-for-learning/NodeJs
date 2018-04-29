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

app.get('/hi', (req, res) => {
  res.send('tShu, this is route hi')
})

server.listen(3004)

console.log(`
Express server listening on port %d in %s mode,
${server.address().port}, ${app.settings.env}
`)
