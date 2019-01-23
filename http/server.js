let http = require('http')

http.createServer((req, res) => {
	console.log(req.rawHeaders)
	console.log(req.headers)
	// res.statusCode = 204
	// res.statusMessage = 'Very Good'
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('By', 'jirengu')
  //res.writeHead(301, 'redirect forever haha', { 'Content-Type': 'text/plain', location: 'https://baidu.com' });
  //res.writeHead(302, { 'Content-Type': 'text/plain', location: 'https://baidu.com' });
  res.writeHead(302, { 'Content-Type': 'text/plain', location: 'https://baidu.com' })
  res.end('ok')
}).listen(8080)