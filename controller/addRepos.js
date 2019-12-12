const reposModel = require('../models/reposDetails')
const userDetailsModel = require('../models/userDetails')

module.exports = {
    reposAdded : async (loginname,reposname,html_url,res) => {
        try{
            const userdetail = userDetailsModel.find({ login: loginname })
            await userdetail.exec((err, data) => {
              if (err) throw err
              if (!data.length) { res.send('User not find') } else {
                const repos = reposModel.find({ login: loginname, name: reposname })
                repos.exec((err, result) => {
                  if (err) throw err
                  if (result.length) res.send('Repository Name Exist')
                  else {
                    const reposDetails = new reposModel({
                      login: loginname,
                      name: reposname,
                      html_url: html_url
                    })
                    reposDetails.save((err, data) => {
                      if (err) throw err
                      res.send('Repository Added!')
                    })
                  }
                })
              }
            })
        }
        catch(error){
            res.send('Error'+error)
        }

    }
}