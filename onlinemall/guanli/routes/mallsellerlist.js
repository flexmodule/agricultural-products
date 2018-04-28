var express = require('express');
var router = express.Router();
var Product=require("../model/product");
var mallUser = require("../model/malluse");
router.get('/', function(req, res, next) {
    if(req.session.malluserInfo){
      mallUser.find({
        name:req.session.malluserInfo["name"]
      }).then(result=>{
        res.render('mallsellerlist', { title: '有机农产品页面列表页面',name:req.cookies["mallcurrentuser"], list:result,isShow:false});
      })
    }else{
      res.render('mallsellerlist', { title: '有机农产品页面列表页面',name:"",isShow:true});
    }

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
  Promise.all([Product.count(),Product.find(query,{},{limit:limit,skip:offset}),Product.find(query,{})]).then(presult=>{
     if(req.session.malluserInfo){
      mallUser.find({
            name:req.session.malluserInfo["name"]
      }).then(result=>{
        res.send({
          name:req.cookies["mallcurrentuser"],
          isShow:false,
          total:presult[0],
          info:presult[1]
         });
      })
      }else{
        res.send({
          name:"",
          isShow:true,
          total:presult[1].length,
          info:presult[1]
         });
      }
  })   
});
router.get('/relist', function(req, res, next) {
  console.log(req.query)
  var offset=req.query.offset;
  var limit=req.query.limit;
  Promise.all([Product.count({}),Product.find({},{},{limit:limit,skip:offset})]).then(presult=>{
     if(req.session.malluserInfo){
      mallUser.find({
            name:req.session.malluserInfo["name"]
      }).then(result=>{
        res.send({
          name:req.cookies["mallcurrentuser"],
          isShow:false,
          total:presult[0],
          info:presult[1]
         });
      })
      }else{
        res.send({
          name:"",
          isShow:true,
          total:presult[0],
          info:presult[1]
         });
      }
  })   
});
  module.exports = router;