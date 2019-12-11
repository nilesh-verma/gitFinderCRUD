const express = require('express')
const router = express.Router()
const mongoController = require('../controller/mongoController')
const validator = require('../controller/validator')

router.post('/adduser', validator.checkforadduser, function (req, res) {
  mongoController.adduser(req, res)
})

router.post('/addrepos', (req, res) => {
  mongoController.addRepos(req, res)
})

router.get('/user', (req, res) => {
  mongoController.alluser(req, res)
})

router.get('/user/:userId', (req, res) => {
  mongoController.userDetails(req, res)
})

router.get('/user/:userId/repos', (req, res) => {
  mongoController.userRepos(req, res)
})

router.put('/updateUser/',validator.checkforadduser, (req, res) => {
  mongoController.updateuserDetails(req, res)
})

router.delete('/deleteRepos', (req, res) => {
  mongoController.deleteRepos(req, res)
})

router.delete('/deleteUser', (req, res) => {
  mongoController.deleteUser(req, res)
})

module.exports = router
