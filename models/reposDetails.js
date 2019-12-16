/* eslint-disable new-cap */
const mongoose = require('mongoose')
const connection = require('../connection/connection')
connection.mongo_connection()
const reposSchema = new mongoose.Schema({
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

const reposModel = new mongoose.model('repositories', reposSchema)
module.exports = reposModel
