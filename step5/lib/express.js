var url = require('url')
var fs = require('fs')
var path = require('path')
var ejs = require('ejs')


function express() {

  var tasks = []

  var app = function(req, res){

    addQuery(req, res)
    addSend(req, res)
    addRender(req, res, app)

    var i = 0

    function next() {
      var task = tasks[i++]
      if(!task) {
        return
      }
      if(task.routePath === null || url.parse(req.url, true).pathname === task.routePath){
        task.middleWare(req, res, next)
      }else{
        next()
      }
    }

    next()
  }

  app.use = function(routePath, middleWare){
    if(typeof routePath === 'function') {
      middleWare = routePath
      routePath = null
    }

    tasks.push({
      routePath: routePath,
      middleWare: middleWare
    })
  }

  app.data = {}

  app.set = function(key, value){
    app.data[key] = value
  }

  app.get = function(key){
    return app.data[key]
  }

  return app

}

express.static = function(staticPath){

  return function(req, res, next){
    var pathObj = url.parse(req.url, true)
    var filePath = path.resolve(staticPath, pathObj.pathname.substr(1))
    console.log(filePath)
    fs.readFile(filePath,'binary', function(err, content){
      if(err){
        next()
      }else {
        res.writeHead(200, 'Ok')
        res.write(content, 'binary')
        res.end()         
      }
    })
  }
}

module.exports = express


function addQuery(req, res){
  var pathObj = url.parse(req.url, true)
  req.query = pathObj.query
}

function addSend(req, res){
  res.send = function(toSend){
    if(typeof toSend === 'string'){
      res.end(toSend)
    }
    if(typeof toSend === 'object'){
      res.end(JSON.stringify(toSend))
    }
    if(typeof toSend === 'number'){
      res.writeHead(toSend, arguments[1])
      res.end()
    }
  }
}

function addRender(req, res, app){

  res.render = function(tplPath, data) {

    var fullpath = path.join(app.get('views'), tplPath) 
    ejs.renderFile(fullpath, data, {}, function(err, str){
      if(err){
        res.writeHead(503, 'System error')
        res.end() 
      }else {
        res.setHeader('content-type', 'text/html')
        res.writeHead(200, 'Ok')
        res.write(str)
        res.end()         
      }
    })
    
  }
}



