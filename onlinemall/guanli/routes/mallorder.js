var express = require('express');
var router = express.Router();
var Product=require("../model/product");
var mallUser = require("../model/malluse");
var mallProduct = require("../model/mallproduct");
router.get('/', function(req, res, next) {
    if(req.session.malluserInfo){
      mallUser.find({
        name:req.session.malluserInfo["name"]
      }).then(result1=>{
        mallProduct.find({
            buyer:req.cookies["mallcurrentuser"]
          }).then(result=>{
            console.log(result)
            res.render('mallorder', { title: '有机农产品购物车页面',name:req.cookies["mallcurrentuser"], isShow:false,info:result[0]});
          })
      })
    }else{
      res.send(`您还未登录，请<a href="/malllogin">登录</a>`);
    }
});
  module.exports = router;