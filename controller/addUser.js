const userModel = require('../models/user')
const userDetailsModel = require('../models/userDetails')

module.exports = {
    userAdded : async (loginname,username,res) => {
        try{
            const url = `https://api.github.com/users/${loginname}`
            const html_url = `https://github.com/${loginname}`
            const repos_url = `https://api.github.com/users/${loginname}/repos`
            const user = new userModel({
              login: loginname,
              url: url,
              html_url: html_url,
              repos_url: repos_url
            })
            const userDetails = new userDetailsModel({
              login: loginname,
              url: url,
              html_url: html_url,
              repos_url: repos_url,
              name: username
            })
    
            await user.save((err, data) => {
              if (err) throw err
            })
    
            await userDetails.save((err, data) => {
              if (err) throw err
              res.send('User Added! \n\n' + data)
            })
        }
        catch(error){
            res.send('Error'+error)
        }

    }
}