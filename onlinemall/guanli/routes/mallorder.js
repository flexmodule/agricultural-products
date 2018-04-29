var express = require('express');
var router = express.Router();
var Product=require("../model/product");
var mallUser = require("../model/malluse");
var mallProduct = require("../model/mallproduct");
var mallOrder = require("../model/mallorder");
router.get('/', function(req, res, next) {
    if(req.session.malluserInfo){
      mallUser.find({
        name:req.session.malluserInfo["name"]
      }).then(result1=>{
        mallOrder.find({
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
router.get('/orderjudge', function(req, res, next) {
  Product.find({
            _id:req.query.id  
          }).then(presult=>{
            mallOrder.create({
                author:presult[0].author,
                id:req.query.id,
                buyer:req.cookies["mallcurrentuser"],
                proname:presult[0].proname,
                kindtype:presult[0].kindtype,
                price:presult[0].price,
                num:req.query.num,
                total:req.query.total,
                date:presult[0].date,
                detail:presult[0].detail,
                pathname:presult[0].pathname
              })
          })    
});
router.get('/orderlist', function(req, res, next) {
  if(req.session.malluserInfo){
    mallUser.find({
      name:req.session.malluserInfo["name"]
    }).then(result1=>{
      mallOrder.find({
          buyer:req.cookies["mallcurrentuser"]
        }).then(result=>{
          res.send({
            info:result
          });
        })
    })
  }else{
    res.send(`您还未登录，请<a href="/malllogin">登录</a>`);
  }
});
router.get("/delete",function(req,res){
  mallOrder.findByIdAndRemove(req.query.id).then(result=>{
    res.redirect("/mallorder");
  })
})
  module.exports = router;