var express = require('express');
var router = express.Router();
var Product=require("../model/product");
var mallUser = require("../model/malluse");
router.get('/', function(req, res, next) {
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
//     Promise.all([Product.count(),Product.find(query,{},{limit:limit,skip:offset}),Product.find(query,{})]).then(result=>{
//       console.log(result)
//        res.send({
//         total:result[2].length,
//         info:result[1]
//        });
//     })
// 	if(req.session.userInfo){
//   	Product.find({
//   		author:req.session.userInfo["name"]
//   	}).then(result=>{
//   		res.render('mallsellerlist', { title: '有机农产品页面产品列表页',name:req.cookies["currentuser"], list:result});
//   	})
//   }else{
//   	res.redirect("/login"); //重新登录
//   }
  
})

  router.get('/relist', function(req, res, next) {
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
    query.author=req.session.userInfo["name"];
    Promise.all([Product.count(),Product.find(query,{},{limit:limit,skip:offset}),Product.find(query,{})]).then(result=>{
      console.log(result)
       res.send({
        total:result[2].length,
        info:result[1]
       });
    })
  });
  module.exports = router;