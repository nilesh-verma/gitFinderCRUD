var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index')
var app = express()
var port = 3000

app.listen(port, (req, res) => {
  console.log('running on 3000')
})

app.use(bodyParser.json())

app.use(logger('dev'))

app.use('/', indexRouter)

module.exports = app
