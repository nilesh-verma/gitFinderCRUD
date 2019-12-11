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

var userModel = new mongoose.model('usersinfos', userSchema)
module.exports = userModel