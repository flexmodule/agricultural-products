var express = require('express');
var router = express.Router();
var Product=require("../model/product");
var mallUser=require("../model/malluse.js");
var User=require("../model/use.js");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"public/photo");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('superproduct', { title: '账户页面',isshow:false,isNew:true});  
  })
router.get("/fixed",function(req,res){
    var model
    if(req.query.type=="mallUser"){
        model=mallUser
    }else if(req.query.type=="User"){
        model=User
    }
    model.find({
      _id:req.query.id
    }).then(result=>{
      res.render('superproduct', { title: '更新页面',isshow:false,isNew:false,info:result[0] });
    })
  })
  
  
  router.post("/fixed",upload.single('picfile'),function(req,res){
      console.log(req.body)
      var model
      if(req.body.oType=="mallUser"){
          model=mallUser
      }else if(req.body.oType=="User"){
          model=User
      }
      model.findByIdAndUpdate(req.body.id,{$set:{name:req.body.name,tel:req.body.tel,password:req.body.psd}}).then(result=>{
      res.redirect("/superaccount");
    })
  })
  
  router.get("/delete",function(req,res){
    var model
    if(req.query.type=="mallUser"){
        model=mallUser
    }else if(req.query.type=="User"){
        model=User
    }
    model.findByIdAndRemove(req.query.id).then(result=>{
      res.redirect("/superaccount");
    })
  })
  module.exports = router;