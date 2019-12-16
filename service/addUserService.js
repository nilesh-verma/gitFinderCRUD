const userModel = require('../models/user')
const userDetailsModel = require('../models/userDetails')

module.exports = {
    userAdded : (loginname,username,res) => {
      const url = `https://api.github.com/users/${loginname}`
      const html_url = `https://github.com/${loginname}`
      const repos_url = `https://api.github.com/users/${loginname}/repos`
      
      const checkUser = new Promise((resolve,reject)=>{
        const userdetail = userDetailsModel.find({ login: loginname })
          userdetail.exec((err, data) => {
          if (err) reject(err)
          if(data.length)
          {
            const err='user exists'
            reject(err)          
          }
          else resolve(data)
          })
        }).catch(err=>{
         throw err
        })

      const saveUser= new Promise((resolve,reject)=>{
        const user = new userModel({
          login: loginname,
          url: url,
          html_url: html_url,
          repos_url: repos_url
        })
        user.save((err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      }).catch(err=>{
        throw err;
      })
      const saveUserDetails= new Promise((resolve,reject)=>{
        const userDetails = new userDetailsModel({
          login: loginname,
          url: url,
          html_url: html_url,
          repos_url: repos_url,
          name: username
        })
        userDetails.save((err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    }).then().catch(err=>{
      throw err;
    })
    
    Promise.all([checkUser,saveUserDetails,saveUser])
    .then(data=>res.send('User Added! \n\n' + data))
    .catch(error=>{
      res.send(error)
      console.log(error)
      
    })
      
        // try{
        //     const userdetail = userDetailsModel.find({ login: loginname })
        //     await userdetail.exec((err, data) => {
        //     if (err) throw err
        //     if (data.length) { res.send('Login Name Exist') }
        //     else{
        //     const url = `https://api.github.com/users/${loginname}`
        //     const html_url = `https://github.com/${loginname}`
        //     const repos_url = `https://api.github.com/users/${loginname}/repos`
        //     const user = new userModel({
        //       login: loginname,
        //       url: url,
        //       html_url: html_url,
        //       repos_url: repos_url
        //     })
        //     const userDetails = new userDetailsModel({
        //       login: loginname,
        //       url: url,
        //       html_url: html_url,
        //       repos_url: repos_url,
        //       name: username
        //     })
    
        //     user.save((err, data) => {
        //       if (err) throw err
        //     })
    
        //     userDetails.save((err, data) => {
        //       if (err) throw err
        //       res.send('User Added! \n\n' + data)
        //     })
        //   }})
        // }
        // catch(error){
        //     res.send('Error'+error)
        // }

    }
}