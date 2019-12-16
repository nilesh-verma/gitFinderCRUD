/* eslint-disable camelcase */
/* eslint-disable new-cap */
const userModel = require('../models/user')
const reposModel = require('../models/reposDetails')
const userDetailsModel = require('../models/userDetails')
const { validationResult } = require('express-validator')
const forAddUser = require('../service/addUserService')
const forAddRepos = require('../service/addReposService')
module.exports = {

  adduser: (req, res) => {
    try{
      const errors = validationResult(req)
      const loginname = req.body.userId
      const username = req.body.name
      if (!errors.isEmpty()) {
        res.send(errors.errors[0].msg)
      } 
      else 
         forAddUser.userAdded(loginname,username,res)            
    }catch(error){
      res.send('Error:'+error)
    } 

  },

  addRepos: (req, res) => {
    const errors = validationResult(req)
    const loginname = req.body.loginId
    const reposname = req.body.reposName
    const html_url = `https://github.com/${loginname}/${reposname}`
    if (!errors.isEmpty()) {
      res.send(errors.errors[0].msg)
    } else {
      forAddRepos.reposAdded(loginname,reposname,html_url,res)
    }
  },

  alluser: (req, res) => {
    try{
      const userlist = userModel.find({})
      userlist.exec((err, data) => {
        if (err) throw err
        res.send(data)
      })
    }
    catch(error){
      res.send('Error: '+error)
    }

  },

  userDetails :(req,res)=>{ 
    return new Promise((resolve,reject)=>{
            const userId = req.params.userId
            const userdetail = userDetailsModel.find({ login: userId })
            userdetail.exec((err, data) => {
            if (err) reject(err)
            else resolve(data)        
          })
      }).then(data =>{
      if (!data.length) res.send('User Not Found')
      else res.send(data)
      }).catch(err=>{
          throw err
      })
    },

    
  userRepos: (req, res) => {
    try{
      const userId = req.params.userId
      const repos = reposModel.find({ login: userId })
      repos.exec((err, data) => {
        if (err) throw err
        if (!data.length) res.send('No Repository Found')
        else res.send(data)
      })
    }
    catch(error){
      res.send('Error:'+error)
    }

  },

  updateuserDetails: (req, res) => {
    try{
      const errors = validationResult(req)
      const userId = req.body.userId
      if (!errors.isEmpty()) {
        let validationError= errors.errors.map((value) => {
          return value.msg+"\n";
        })
        res.send(validationError)
      } 
      else {
        const userdetail = userDetailsModel.findOneAndUpdate({ login: userId }, {
          name: req.body.name,
          company: req.body.company,
          blog: req.body.blog,
          location: req.body.location,
          email: req.body.email
        })
         userdetail.exec((err, data) => {
          if (err) throw res.send(err.message)
          if (!data) res.send('user not found')
          else res.send('Details updated')
        })
      }
    }
    catch(error){
      res.send('Error:'+error)
    }

  },

  deleteRepos: (req, res) => {
    try{
      const userId = req.body.userId
      const reposName = req.body.reposName
      const deleteRepos = reposModel.findOneAndDelete({ login: userId, name: reposName })
      deleteRepos.exec((err, data) => {
        if (err) throw err
        if (!data) res.send('Repository Not Found, Check loginId/reposName.')
        else res.send(reposName + ' Deleted!')
      })
    }
    catch(error){
      res.send('Error:'+error)
    }

  },

  deleteUser: (req, res) => {
    try{
      const userId = req.body.userId
      const deleteUser = userModel.findOneAndDelete({ login: userId })
      deleteUser.exec((err, data) => {
        if (err) throw err
        if (!data) res.send('No User Found!')
        else {
          userDetailsModel.findOneAndDelete({ login: userId }).exec((err, data) => {
            if (err) throw err
          })
          reposModel.deleteMany({ login: userId }).exec((err, data) => {
            if (err) throw err
          })
          res.send('User Deleted!')
        }
      })
    }
    catch(error){
      res.send('Error:'+error)
    }

  }
}
