var express = require('express');
var router = express.Router();
var userModel =require('../models/user');
var reposModel = require('../models/reposDetails');

/* GET home page. */
router.post('/user', function(req, res) {
  let loginname = req.body.login;
  let url=`https://api.github.com/users/${loginname}`;
  let html_url=`https://github.com/${loginname}`;
  let repos_url=`https://api.github.com/users/${loginname}/repos`;
  var user =new userModel({
    login:loginname,
    url:url,
    html_url:html_url,
    repos_url:repos_url
  });
  user.save((err,data)=>{
    if(err) throw err;
    res.send(user);
  })
});

router.post('/repos',(req,res)=>{
  let loginname = req.body.login;
  let reposname = req.body.name;
  let html_url = `https://github.com/${loginname}/${reposname}`;
  var reposDetails = new reposModel({
    login:loginname,
    name:reposname,
    html_url:html_url
  });
  reposDetails.save((err,data)=>{
    if(err) throw err;
    res.send(reposDetails);

  })

});

module.exports = router;
