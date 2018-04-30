var express = require('express');
var router = express.Router();
var Product=require("../model/product");
var mallUser=require("../model/malluse.js");
var User=require("../model/use.js");
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.superuserInfo){
        mallUser.find({
  	}).then(result=>{
  		res.render('superaccount', { title: '账户管理页面',name:req.cookies["supercurrentuser"], list:result});
  	})
  }else{
  	res.redirect("/superlogin"); //重新登录
  }
  
})

router.get('/list', function(req, res, next) {
  var offset=req.query.offset;
  var limit=req.query.limit;
  Promise.all([mallUser.count({}),mallUser.find({},{},{limit:limit,skip:offset})]).then(result=>{
    console.log(result)
     res.send({
      total:result[0],
      info:result[1]
     });
  })
});
router.get('/relist', function(req, res, next) {
    var offset=req.query.offset;
    var limit=req.query.limit;
    Promise.all([User.count({}),User.find({},{},{limit:limit,skip:offset})]).then(result=>{
      console.log(result)
       res.send({
        total:result[0],
        info:result[1]
       });
    })
});


router.get("/logout",function(req,res){
	req.session.destroy(()=>{
		res.redirect("/superlogin");
	})
})
module.exports = router;
