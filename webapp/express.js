/*
* express.js -- simple express server
* */

'use strict'

const http = require('http')
const express = require('express')
const app = express()

const server = http.createServer(app)

app.use(express.logger()) // 把请求日志打印在控制台中

app.get('/', (req, res,) => {
  res.send('Hello Express!')
})

app.get('/hi', (req, res) => {
  res.send('tShu, this is route hi')
})

server.listen(3002)

console.log(`
Express server listening on port %d in %s mode,
${server.address().port}, ${app.settings.env}
`)
