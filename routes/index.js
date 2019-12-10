var express = require('express');
var router = express.Router();
var userModel =require('../models/user')

/* GET home page. */
router.post('/', function(req, res, next) {
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
    res.send("uploaded");
  })
});

module.exports = router;
