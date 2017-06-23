var http = require('http')
var fs = require('fs')
var url = require('url')

var port = process.env.PORT || 8080;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var lazy = query.t || 0;
  var method = request.method

  var type = path.match(/\..+$/) ?  path.match(/\..+$/)[0] : ''


  switch (type) {
    case '.html':
      response.setHeader('Content-Type','text/html; charset="utf-8"')
      break
    case '.css':
      response.setHeader('Content-Type','text/css')
      break 
    case '.js':
      response.setHeader('Content-Type','application/javascript') 
      break
    case '.jpg':
      response.setHeader('Content-Type','image/jpeg') 
      break
    case '.png':
      response.setHeader('Content-Type','image/png') 
      break
    case '.json':
      response.setHeader('Content-Type','application/json') 
      break
    default:
      response.statusCode = 404
      response.end('not found')
      return
  } 

  let file = fs.readFileSync('./public' + path,'utf-8')
  setTimeout(function(){
    response.end(file)
  }, lazy*1000)  

  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('visit http://localhost:' + port)
