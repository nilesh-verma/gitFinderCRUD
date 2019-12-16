/* eslint-disable new-cap */
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
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

const userModel = new mongoose.model('users', userSchema)
module.exports = userModel
