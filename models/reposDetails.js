/* eslint-disable new-cap */
const mongooose = require('mongoose')
mongooose.connect('mongodb://localhost:27017/gitFinder', { useNewUrlParser: true })
const reposSchema = new mongooose.Schema({
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

const reposModel = new mongooose.model('repositories', reposSchema)
module.exports = reposModel
