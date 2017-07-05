var http = require('http')

var server = http.createServer(function(request, response){
  //setTimeout(function(){
    
    //response.setHeader("Content-Type","text/plain; charset=utf-8")
    response.setHeader('Content-Type','text/html')
    //response.writeHead(202, 'haha')
    response.write('<html><head><meta charset="utf-8" /></head>')
    response.write('<body>')
    response.write('<h1>你好</h1>')
    response.write('</body>')
    
    response.end()
  //},2000);
})

console.log('open http://localhost:8080')
server.listen(8080)