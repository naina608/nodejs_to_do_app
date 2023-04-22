const jwtToken=require("jsonwebtoken");
const sendCookie=(user,res,message,statuscode=200)=>{
const token=jwtToken.sign({_id:user._id},process.env.SECRET_KEY);
    res.status(statuscode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        //sameSite:process.env.NODE_ENV==="development"?"lax":"none",
        sameSite:"none",
        //secure:process.env.NODE_ENV==="development"?false:true
        secure:true
    }).json({
        sucess:true,
        message,
    });
}
module.exports=sendCookie;
