/* eslint-disable new-cap */
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gitFinder', { useNewUrlParser: true })
var userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  id: {
    type: Number,
    required: false,
    index: {
      unique: false
    }
  },
  url: {
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
  },
  repos_url: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
})

var userModel = new mongoose.model('users', userSchema)
module.exports = userModel
