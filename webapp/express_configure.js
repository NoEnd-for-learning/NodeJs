/*
* express.js -- simple express server with middleware
* */

'use strict'

const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(app)

app.configure(() => { // 在每个环境中添加bodyParser 和 methodOverride 中间件。
  app.use(express.bodyParser())
  app.use(express.methodOverride())
})

app.configure('development', () => { // 对于development 环境，添加logger（）方法，配置errorHandler 方法以输出全部异常和显示栈轨迹。
  app.use(express.logger())
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }))
})

app.get('/', (req, res,) => {
  res.send('Hello Express Middleware')
})

app.get('/hi', (req, res) => {
  res.send('tShu, this is route hi')
})

server.listen(3003)

console.log(`
Express server listening on port %d in %s mode,
${server.address().port}, ${app.settings.env}
`)
