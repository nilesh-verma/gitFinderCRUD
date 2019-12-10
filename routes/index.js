const express = require('express')
const router = express.Router()
const mongoController = require('../controller/mongoController')
const validator = require('../controller/validator')

router.post('/user', validator.checkforadduser, function (req, res) {
  mongoController.adduser(req, res)
})

router.post('/repos', validator.checkforadduser, (req, res) => {
  mongoController.addRepos(req, res)
})

router.get('/user', (req, res) => {
  mongoController.alluser(req, res)
})

router.get('/user/:login', (req, res) => {
  mongoController.userDetails(req, res)
})

router.get('/user/:login/repos', (req, res) => {
  mongoController.userRepos(req, res)
})

module.exports = router
