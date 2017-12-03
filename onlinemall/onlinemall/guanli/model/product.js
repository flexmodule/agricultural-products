var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var obj={
	author:String,
    proname:String,
    kindtype:String,
    price:String,
    num:String,
    date:String,
    detail:String,
    pathname:String
}

var model=mongoose.model("product",new Schema(obj));
module.exports=model;