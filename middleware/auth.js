const User=require("../models/user");
const jwtToken=require("jsonwebtoken");
const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(404).json({
            sucess:false,
            message:"login first",
        });
    }

    const decoded=jwtToken.verify(token,process.env.SECRET_KEY);
    req.user= await User.findById(decoded._id);
    next();
};
module.exports=isAuthenticated;