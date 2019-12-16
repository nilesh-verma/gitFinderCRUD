/* eslint-disable new-cap */
const mongoose = require('mongoose')
const connection = require('../connection/connection')
connection.mongo_connection()
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
  },
  name: {
    type: String,
    required: true,
    index: {
      unique: false
    }
  },
  company: {
    type: String,
    required: false,
    index: {
      unique: false
    }
  },
  blog: {
    type: String,
    required: false,
    index: {
      unique: false
    }
  },
  location: {
    type: String,
    required: false,
    index: {
      unique: false
    }
  },
  email: {
    type: String,
    required: false,
    index: {
      unique: false
    }
  }
})

const userModel = new mongoose.model('usersinfos', userSchema)
module.exports = userModel
