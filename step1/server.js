var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')


function staticRoot(staticPath, req, res){
  /*
    http://localhost:8080/a.html?t=1
    pathObj.pathname => /a.html
    pathObj.query.t => 1
    filePath = /{{staticPath}}/a.html
  */
  var pathObj = url.parse(req.url, true)
  var filePath = path.resolve(staticPath, pathObj.pathname.substr(1))
  var fileContent = fs.readFileSync(filePath,'binary')

  res.writeHead(200, 'Ok')
  res.write(fileContent, 'binary')
  res.end()
}

var server = http.createServer(function(req, res){
  staticRoot(path.resolve(__dirname, 'static'), req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080' )


/**
TODO:
1. MIME Type
2. Cache
3. Gzip
4. Error Handing
**/

