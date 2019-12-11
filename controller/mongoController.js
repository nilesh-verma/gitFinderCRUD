/* eslint-disable camelcase */
/* eslint-disable new-cap */
var userModel = require('../models/user')
var reposModel = require('../models/reposDetails')
var userDetailsModel = require('../models/userDetails')
var { validationResult } = require('express-validator')

module.exports = {

  adduser: async (req, res) => {
    const errors = validationResult(req)
    const loginname = req.body.userId
    const username = req.body.name
    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg)
    } else {
      const userdetail = userDetailsModel.find({ login: loginname })
      await userdetail.exec((err, data) => {
        if (err) throw err
        if (data.length) { res.send('Login Name Exist') } else {
          const url = `https://api.github.com/users/${loginname}`
          const html_url = `https://github.com/${loginname}`
          const repos_url = `https://api.github.com/users/${loginname}/repos`
          var user = new userModel({
            login: loginname,
            url: url,
            html_url: html_url,
            repos_url: repos_url
          })
          var userDetails = new userDetailsModel({
            login: loginname,
            url: url,
            html_url: html_url,
            repos_url: repos_url,
            name: username
          })

          user.save((err, data) => {
            if (err) throw err
          })

          userDetails.save((err, data) => {
            if (err) throw err
            res.send('User Added! \n\n'+data)
          })
        }
      })
    }
  },

  addRepos: async (req, res) => {
    const errors = validationResult(req)
    const loginname = req.body.loginId
    const reposname = req.body.reposName
    const html_url = `https://github.com/${loginname}/${reposname}`
    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg)
    } else {
      const userdetail = userDetailsModel.find({ login: loginname })
      await userdetail.exec((err, data) => {
        if (err) throw err
        if (!data.length) { res.send('User not find') } else {
          const repos = reposModel.find({ login: loginname, name: reposname })
          repos.exec((err, result) => {
            if (err) throw err
            if (result.length) res.send('Repository Name Exist')
            else {
              var reposDetails = new reposModel({
                login: loginname,
                name: reposname,
                html_url: html_url
              })
              reposDetails.save((err, data) => {
                if (err) throw err
                res.send("Repository Added!")
              })
            }
          })
        }
      })
    }
  },

  alluser: async (req, res) => {
    const userlist = userModel.find({})    
    await userlist.exec((err, data) => {
      if (err) throw err
      res.send(data)
    })
  },

  userDetails: async (req, res) => {
    const userId = req.params.userId
    const userdetail = userDetailsModel.find({ login: userId })
    await userdetail.exec((err, data) => {
      if (err) throw err
      if(!data.length) res.send('User Not Found')
      else res.send(data)
    })
  },

  userRepos: async (req, res) => {
    const userId = req.params.userId
    const repos = reposModel.find({ login: userId })
    await repos.exec((err, data) => {
      if (err) throw err
      if(!data.length) res.send('No Repository Found')
      else res.send(data)
    })
  },

  updateuserDetails: async (req, res) => {
    const errors = validationResult(req)
    const userId = req.body.userId
    if(!errors.isEmpty()) res.send(errors.errors[0].msg)
    else {
    const userdetail = userDetailsModel.findOneAndUpdate({login:userId},{ 
      name: req.body.name,
      company: req.body.company,
      blog: req.body.blog,
      location: req.body.location,
      email: req.body.email
    })
    await userdetail.exec((err, data) => {
      if (err) throw res.send(err.message)
      if(!data) res.send('user not found')    
      else res.send('Details updated')
    })
  }
  },

  deleteRepos: async (req, res) => {
    const userId = req.body.userId
    const reposName = req.body.reposName
    const deleteRepos = reposModel.findOneAndDelete({login:userId,name:reposName})
    await deleteRepos.exec((err,data) => {
      if(err) throw err
      if(!data) res.send('Repository Not Found, Check loginId/reposName.')
      else res.send(reposName +' Deleted!')
    })
  },
  
  deleteUser: async (req, res) => {
    const userId = req.body.userId
    const deleteUser = userModel.findOneAndDelete({login:userId})
    await deleteUser.exec((err, data) => {
      if(err) throw err
      if(!data) res.send('No User Found!')
      else {
        userDetailsModel.findOneAndDelete({login:userId}).exec((err,data) => {
          if (err) throw err
        })
        reposModel.deleteMany({login:userId}).exec((err,data) => {
          if (err) throw err 
        })
        res.send('User Deleted!')

      } 
    })
  }
}
