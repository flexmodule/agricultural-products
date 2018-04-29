var express = require('express');
var router = express.Router();
var Product=require("../model/product");
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.superuserInfo){
  	Product.find({
  	}).then(result=>{
  		res.render('superindex', { title: '有机农产品页面',name:req.cookies["supercurrentuser"], list:result});
  	})
  }else{
  	res.redirect("/superlogin"); //重新登录
  }
  
})

router.get('/list', function(req, res, next) {
  var offset=req.query.offset;
  var limit=req.query.limit;
  Promise.all([Product.count({}),Product.find({},{},{limit:limit,skip:offset})]).then(result=>{
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
     res.send({
      total:result[2].length,
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
