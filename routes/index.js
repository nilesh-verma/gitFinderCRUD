const express = require('express')
const router = express.Router()
const mongoController = require('../controller/mongoController')
const validator = require('../controller/validator')

/*
** For add new user
*/
router.post('/adduser', validator.checkforadduser, function (req, res) {
  mongoController.adduser(req, res)
})

/*
** For add new repository
*/
router.post('/addrepos', (req, res) => {
  mongoController.addRepos(req, res)
})

/*
** For get all user
*/
router.get('/user', (req, res) => {
  mongoController.alluser(req, res)
})

/*
** For add new user
*/
router.get('/user/:userId', (req, res) => {
  mongoController.userDetails(req, res)
})

/*
** For get all repositary of user
*/
router.get('/user/:userId/repos', (req, res) => {
  mongoController.userRepos(req, res)
})

/*
** For add update user details.
*/
router.put('/updateUser/', validator.checkforadduser, (req, res) => {
  mongoController.updateuserDetails(req, res)
})

/*
** For delete repository of user
*/
router.delete('/deleteRepos', (req, res) => {
  mongoController.deleteRepos(req, res)
})

/*
** For delete a user account.
*/
router.delete('/deleteUser', (req, res) => {
  mongoController.deleteUser(req, res)
})

module.exports = router
