/*
* connect.js -- simple connect server
* */

const http = require('http')

const connect = require('connect')

const app = connect()

const tipText = 'Hello tShu!'

const connectHello = (req, res, next) => {
  res.setHeader('connect-length', tipText.length)
  res.end(tipText)
}

app.use(connectHello)

const server = http.createServer(app)

server.listen(3001)
console.log('Listening on port %d', server.address().port)
