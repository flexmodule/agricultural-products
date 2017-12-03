var express = require('express');
var router = express.Router();
var Product=require("../model/product.js");
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
  res.render('product', { title: '上架产品页面',isshow:false,isNew:true});  
})
router.post('/', upload.single('picfile'),function(req, res) {
  console.log(process.cwd())
  Product.create({
    author:req.cookies["currentuser"],
    proname:req.body.proname,
    kindtype:req.body.kindtype,
    price:req.body.price,
    num:req.body.num,
    date:req.body.date,
    detail:req.body.detail,
    pathname:`/photo/${req.file.filename}`
  }).then(result=>{
    res.redirect("/");
  })
})


router.get("/fixed",function(req,res){
  Product.find({
    _id:req.query.id
  }).then(result=>{
    res.render('product', { title: '更新页面',isshow:false,isNew:false,info:result[0] });
  })
})


router.post("/fixed",upload.single('picfile'),function(req,res){
   console.log(process.cwd())
  Product.findByIdAndUpdate(req.body.id,{$set:{proname:req.body.proname,price:req.body.price,type:req.body.kindtype,num:req.body.num,date:req.body.date,detail:req.body.detail,pathname:`/photo/${req.file.filename}`}}).then(result=>{
    res.redirect("/");
  })
})

router.get("/delete",function(req,res){
  Product.findByIdAndRemove(req.query.id).then(result=>{
    res.redirect("/");
  })
})
module.exports = router;
