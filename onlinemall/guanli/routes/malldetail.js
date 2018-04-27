var express = require('express');
var router = express.Router();
var Product=require("../model/product");
var mallUser = require("../model/malluse");
router.get('/', function(req, res, next) {
  // console.log(req.query)

    if(req.session.malluserInfo){
      mallUser.find({
        name:req.session.malluserInfo["name"]
      }).then(result1=>{
        Product.find({
            _id:req.query.dataid
          }).then(result=>{
            res.render('malldetail', { title: '有机农产品页面详情页面',name:req.cookies["mallcurrentuser"], isShow:false,shopname:req.query.sellername,info:result[0]});
          })
      })
    }else{
      Product.find({
          _id:req.query.dataid
        }).then(result=>{
          console.log(result)
          res.render('malldetail', { title: '有机农产品页面详情页面',name:"",isShow:true,shopname:req.query.sellername,info:result[0]});
        })
    }

});

  module.exports = router;