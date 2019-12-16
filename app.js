const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const env_Var = require('./config/env.json')
const app = express()
const port = env_Var.development.node_port
console.log('PORT'+port)
app.use(bodyParser.json())

app.use(logger('dev'))

// for perform all CURD operation
app.use('/', indexRouter)

// for host app
app.listen(port, (req, res) => { console.log(`running on ${port}`) })

module.exports = app
