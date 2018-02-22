var express = require('express');
var router = express.Router();
var Product = require("../model/product");
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({
  		_id:req.query.id
  	}).then(result=>{
  		console.log(result);
  		res.render('detail', { title: '农产品详情页面',isshow:false,info:result[0] });
  	})
  
});
   
module.exports = router;
