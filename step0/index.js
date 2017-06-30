var http = require('http')


var server = http.createServer(function(request, response){
  //response.setHeader('Content-Type', 'text/html')
  //response.setHeader('X-Powered-By',  'Jirengu')
  response.end('hello world')
})

console.log('open http://localhost:8080')
server.listen(8080)