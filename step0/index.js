var http = require('http')

// var server = http.createServer(function(req, res){
//     console.log('jiengu')
//     res.setHeader("Content-Type","text/html; charset=utf-8")
//     res.write('<h1> 饥人谷</h1>')
//     res.end()
// })
// server.listen(9000)


var server = http.createServer(function(request, response){
  setTimeout(function(){
    
    
    response.setHeader('Content-Type','text/html; charset=utf-8')
    response.writeHead(404, 'Not Found')
    response.write('<html><head><meta charset="gbk" /></head>')
    response.write('<body>')
    response.write('<h1>你好</h1>')
    response.write('</body>')
    response.write('</html>')
    
    response.end()
  },2000);
})

console.log('open http://localhost:8080')
server.listen(8080)