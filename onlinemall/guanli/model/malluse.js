var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var obj={
	name:String,
	tel:String,
    password:String
}

var model=mongoose.model("malluser",new Schema(obj));
module.exports=model;