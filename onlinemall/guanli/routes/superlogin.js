var express = require('express');
var router = express.Router();
var User=require("../model/use.js");
var superUser=require("../model/superuse.js");
var md5=require("md5");

router.get('/', function(req, res, next) {
  res.render('superlogin', { title: '登录页面',isexp:false});
});
router.post('/', function(req, res) {
    superUser.find({
 		name:req.body.username,
 		password:md5(req.body.password)
 	}).then(result=>{
 		if(result.length==0){
 		 res.render('superlogin', { title: '登录页面',isexp:true});
 		}else{
 		console.log(result[0]);
 		req.session.superuserInfo = result[0];
 		res.cookie("supercurrentuser",result[0].name);
 		res.redirect("/superindex");
 		}
 	})
});

module.exports = router;
