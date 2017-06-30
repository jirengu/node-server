var url = require('url')


function express() {

  var tasks = []

  var app = function(req, res){
    makeQuery(req)
    makeResponse(res)

    var i = 0

    function next() {
      var task = tasks[i++]
      if(!task) {
        return
      }

      //如果是普通的中间件 或者 是路由匹配上的中间件  
      if(task.routePath === null || url.parse(req.url, true).pathname === task.routePath){
        task.middleWare(req, res, next)
      }else{
        //如果说路由未匹配上的中间件，直接下一个
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


  return app

}

express.static = function(path){

  return function(req, res){

  }
}

module.exports = express


function makeQuery(req){
  var pathObj = url.parse(req.url, true)
  req.query = pathObj.query
}

function makeResponse(res){
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



