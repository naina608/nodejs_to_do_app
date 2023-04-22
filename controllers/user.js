const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwtToken=require("jsonwebtoken");
const sendCookie= require("../utils/features");
const { Errorhandler } = require("../middleware/error");
const login=async(req,res,next)=>{
    try {
        
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password"); //because password bydefault is selected false
    if(!user){
        return next(new Errorhandler("Invalid email or password",404));
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return next(new Errorhandler("Invalid email or password",404));
    }
    sendCookie(user,res,`Welcome ${user.name}`,200);
        
    }
     catch (error) {
    next(error);    
    }
}
const register=async(req,res,next)=>{
    try {
        const {name,email,password}=req.body;
    let user=await User.findOne({email});
    if(user){
        return next(new Errorhandler("User already exists",400));
    }
    const hashedpassword=await bcrypt.hash(password,10);
    user=  await User.create({name,email,password:hashedpassword});

    sendCookie(user,res,"Registered successfully",201);
        
    } catch (error) {
        next(error);
    }
}
const getMyProfile=(req,res)=>{
        res.status(201).json({
            sucess:true,
            user:req.user,
        });
}
const logout=(req,res)=>{
    res.status(201).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV=="development"?"lax":"none",
        secure:process.env.NODE_ENV=="development"?false:true
    }).json({
        sucess:true,
        user:req.user,
    });
}
module.exports={login,getMyProfile,register,logout};
