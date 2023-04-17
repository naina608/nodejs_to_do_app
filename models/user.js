const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:false,
        required:true,
    },
    password:{
        type:String,
        select:false,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true,
    }
});
const User=mongoose.model("users",schema);
module.exports=User;
