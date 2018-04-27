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
        Product.find({
            _id:req.query.id
          }).then(result=>{
            res.render('malldetail', { title: '有机农产品页面详情页面',name:req.cookies["mallcurrentuser"], isShow:false,shopname:req.query.sellername,info:result[0]});
          })
      })
    }else{
      Product.find({
          _id:req.query.id
        }).then(result=>{
          console.log(result)
          res.render('malldetail', { title: '有机农产品页面详情页面',name:"",isShow:true,shopname:req.query.sellername,info:result[0]});
        })
    }
});
router.get('/castjudge', function(req, res, next) {
  Product.find({
            _id:req.query.id
          }).then(presult=>{
            
            mallProduct.find({
          _id:req.query.id
           }).then(mpresult=>{
          if(mpresult.length==0){
            mallProduct.create({
                author:presult[0].author,
                proname:presult[0].proname,
                kindtype:presult[0].kindtype,
                price:presult[0].price,
                num:req.body.num,
                date:presult[0].date,
                detail:presult[0].detail,
                pathname:presult[0].pathname
              })
          }else {
            mallProduct.findByIdAndUpdate(req.body.id,{$set:{proname:presult[0].proname,price:presult[0].price,kindtype:presult[0].kindtype,num:req.body.num,date:presult[0].date,detail:presult[0].detail,pathname:presult[0].pathname}}).then(result=>{
            })
          }
          res.send({
         });
       })

          })
      
});
router.get('/list', function(req, res, next) {
  console.log(req.query)
  var offset=req.query.offset;
  var limit=req.query.limit;
  var key=req.query.key;
  var choose;
  if(req.query.type=="kindtype"){
        choose=req.query.type;
  }else if(req.query.type=="proname"){
        choose=req.query.type;
  }else if(req.query.type=="date"){
        choose=req.query.type;
  }
  var query={};
  query[choose]=key;
  Promise.all([Product.count(),Product.find(query,{},{limit:limit,skip:offset}),Product.find(query,{})]).then(result=>{
    console.log(result)
     if(req.session.malluserInfo){
      mallUser.find({
            name:req.session.malluserInfo["name"]
      }).then(result=>{
        res.send({
          name:req.cookies["mallcurrentuser"],
          isShow:false,
          total:result[0],
          info:result[1]
         });
      })
      }else{
        res.send({
          name:"",
          isShow:true,
          total:result[1].length,
          info:result[1]
         });
      }
  })   
});
router.get('/relist', function(req, res, next) {
  console.log(req.query)
  var offset=req.query.offset;
  var limit=req.query.limit;
  Promise.all([Product.count({}),Product.find({},{},{limit:limit,skip:offset})]).then(result=>{
    console.log(result)
     if(req.session.malluserInfo){
      mallUser.find({
            name:req.session.malluserInfo["name"]
      }).then(result=>{
        res.send({
          name:req.cookies["mallcurrentuser"],
          isShow:false,
          total:result[0],
          info:result[1]
         });
      })
      }else{
        res.send({
          name:"",
          isShow:true,
          total:result[0],
          info:result[1]
         });
      }
  })   
});
  module.exports = router;