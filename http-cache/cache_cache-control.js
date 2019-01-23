/* 
  缓存的第二种方案,浏览器把文件和附带信息保存起来。当再次需要a.jpg 时，如果是在300秒以内发起的请求则直接使用缓存(200, from memory cache)，否则重新发起网络请求(200)。


  请求报文
    - Cache-Control: max-age=10 //hi,(代理)服务器我想要
    - Cache-Control: no-cache // hi,(代理)服务器，不要给我缓存的东西，我要新鲜完整的内容
    - Cache-Control: no-store // hi,(代理)服务器, 这是机密请求，别缓存数据，给我最新的
  响应报文
    - Cache-Control: max-age=10 //hi,浏览器，把这个文件信息保存起来。当再次需要它时，如果是在10秒以内发起的请求则直接使用缓存(200, from memory cache)，否则重新发起网络请求找我要(200)
    - Cache-Control: no-cache // hi,浏览器(代理服务器)，你可以缓存，但每次需要向我确认一下
    - Cache-Control: no-store // hi,浏览器（代理服务器），这是机密信息，别缓存

  访问 http://localhost:8080/index.html */

const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
	let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {

  		// example1
  		//res.setHeader('Cache-Control', 'max-age=10')
  		

  		// example2
			//res.setHeader('Cache-Control', 'no-cache')

			// example3
			res.setHeader('Cache-Control', 'no-store')


      res.writeHead(200, 'OK')
  		res.end(data)
  	}
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )



