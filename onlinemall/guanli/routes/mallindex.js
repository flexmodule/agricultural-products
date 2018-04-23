var express = require('express');
var router = express.Router();
var Product=require("../model/product");
var mallUser = require("../model/malluse");

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.malluserInfo){
  	mallUser.find({
  		name:req.session.malluserInfo["name"]
  	}).then(result=>{
  		res.render('mallindex', { title: '有机农产品页面',name:req.cookies["mallcurrentuser"], list:result,isShow:false});
  	})
  }else{
  	res.render('mallindex', { title: '有机农产品页面',name:"",isShow:true});
  }
});

router.get("/malllogout",function(req,res){
	req.session.destroy(()=>{
		res.redirect("/malllogin");  
	})
})


module.exports = router;
