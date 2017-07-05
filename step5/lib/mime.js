
var url = require('url')
var mime = require('mime-types')

function Mime(req, res, next){
  var pathObj = url.parse(req.url, true)
  var mimeType = mime.lookup(pathObj.pathname)
  console.log(mimeType)

  res.setHeader('content-type', mimeType)
  next()
}

module.exports = Mime