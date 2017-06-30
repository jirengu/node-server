var express = require('./lib/express')
var path = require('path')



var app = express()


//app.use(express.static(path.join(__dirname, 'public')))


app.use(function(req, res, next) {
  console.log('middleware 1')
  next()
})

app.use(function(req, res, next) {
  console.log('middleware 12')
  next()
})


app.use('/hello', function(req, res){
  console.log('/hello..')
  res.send('hello world')
})

app.use('/getWeather', function(req, res){
  res.send({url:'/getWeather', city: req.query.city})
})

app.use(function(req, res){
  res.send(404, 'haha Not Found')
})


module.exports = app
