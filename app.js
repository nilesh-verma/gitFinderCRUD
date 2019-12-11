const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(logger('dev'))

// for perform all CURD operation
app.use('/', indexRouter)

// for host app
app.listen(port, (req, res) => { console.log('running on 3000') })

module.exports = app
