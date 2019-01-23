/* 一个最简单的静态服务器 */
/* 访问 http://localhost:8080/picture.jpg */

const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, req.url), (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {
      res.writeHead(200, 'OK')
  		res.end(data)
  	}
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )



