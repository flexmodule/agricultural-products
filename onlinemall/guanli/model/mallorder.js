var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var obj={
    author:String,
    id:String,
    buyer:String,
    proname:String,
    kindtype:String,
    price:String,
    num:String,
    total:String,
    date:String,
    detail:String,
    pathname:String
}

var model=mongoose.model("mallorder",new Schema(obj));
module.exports=model;