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
            res.render('mallcast', { title: '有机农产品购物车页面',name:req.cookies["mallcurrentuser"], isShow:false,info:result});
          })
      })
    }else{
      res.send(`您还未登录，请<a href="/malllogin">登录</a>`);
    }
});
router.get('/castjudge', function(req, res, next) {
  Product.find({
            _id:req.query.id
          }).then(presult=>{
            mallProduct.find({
              id:req.query.id,
           }).then(mpresult=>{
          if(mpresult.length==0){
            mallProduct.create({
                author:presult[0].author,
                id:req.query.id,
                buyer:req.cookies["mallcurrentuser"],
                proname:presult[0].proname,
                kindtype:presult[0].kindtype,
                price:presult[0].price,
                num:req.query.num,
                date:presult[0].date,
                detail:presult[0].detail,
                pathname:presult[0].pathname
              })
          }else {
            var oNum=Number(mpresult[0].num)+Number(req.query.num)
            mallProduct.update({
              id:req.query.id,
            },{$set:{id:req.query.id,proname:presult[0].proname,price:presult[0].price,kindtype:presult[0].kindtype,num:oNum,date:presult[0].date,detail:presult[0].detail,pathname:presult[0].pathname}}).then(result=>{
            })
          }
          res.send({
         });
       })

          })
      
});
router.get('/castlist', function(req, res, next) {
  if(req.session.malluserInfo){
    mallUser.find({
      name:req.session.malluserInfo["name"]
    }).then(result1=>{
      mallProduct.find({
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
  mallProduct.findByIdAndRemove(req.query.id).then(result=>{
    res.redirect("/mallcast");
  })
})
  module.exports = router;