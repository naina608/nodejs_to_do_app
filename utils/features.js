const jwtToken=require("jsonwebtoken");
const sendCookie=(user,res,message,statuscode=200)=>{
const token=jwtToken.sign({_id:user._id},process.env.SECRET_KEY);
    res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "none",
      secure : true,
    })
    .json({
      success: true,
      message,
    });
}
module.exports=sendCookie;
