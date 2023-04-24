const jwtToken=require("jsonwebtoken");
const sendCookie=(user,res,message,statuscode=200)=>{
const token=jwtToken.sign({_id:user._id},process.env.SECRET_KEY);
    res.status(statuscode).cookie("token",token,{
    res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
}
module.exports=sendCookie;
