var express = require('express');
var router = express.Router();
var User=require("../model/use.js");
var md5=require("md5");

router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面',isexp:false});
});
router.post('/', function(req, res) {
 	User.find({
 		name:req.body.username,
 		password:md5(req.body.password)
 	}).then(result=>{
 		if(result.length==0){
 		 res.render('login', { title: '登录页面',isexp:true});
 		}else{
 		console.log(result[0]);
 		req.session.userInfo = result[0];
 		res.cookie("currentuser",result[0].name);
 		res.redirect("/");
 		}
 	})
});

module.exports = router;
