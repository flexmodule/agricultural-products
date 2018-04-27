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

var model=mongoose.model("mallproduct",new Schema(obj));
module.exports=model;