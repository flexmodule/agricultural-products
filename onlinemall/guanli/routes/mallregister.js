var express = require('express');
var router = express.Router();
var User = require("../model/malluse");
var md5= require("md5");
router.get('/', function(req, res, next) {
  res.render('mallregister', { title: '有机农产品商家后台注册页面'});
});
router.post('/', function(req, res) {
  console.log(req.body)
  User.find({
        name:req.body.name,
  }).then(result=>{
                    console.log(result.length)
                    if(result.length==0){
                      res.send(); 
                    }else{
                      res.send(result);
                    }
  })
});
router.post('/zhuce', function(req, res) {
  console.log(req.body)
  console.log(req.body.usna=="√"&&req.body.pw=="√"&&req.body.su=="√"&&req.body.cn=="√")
  if(req.body.usna=="√"&&req.body.pw=="√"&&req.body.su=="√"&&req.body.cn=="√"){
        User.create({
              name:req.body.username,
              tel:req.body.tel,
              password:md5(req.body.password)
        }).then(result=>{
              res.send(result);
        });
      
  }else{
        res.send();
  }  
});

module.exports = router;
