/* eslint-disable new-cap */
var mongooose = require('mongoose')
mongooose.connect('mongodb://localhost:27017/gitFinder', { useNewUrlParser: true })
var reposSchema = new mongooose.Schema({
  login: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  html_url: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
})

var reposModel = new mongooose.model('repositories', reposSchema)
module.exports = reposModel
