
/*
* app.js - Hello World
 */

const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((reg, res) => {
  let res_text = reg.url === '/test' ? 'you have hit the test page' : 'Hello World'
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end(res_text)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
