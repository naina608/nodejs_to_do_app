const express=require("express");
const router=express.Router();
const {login,getMyProfile,register,logout}=require("../controllers/user");
const isAuthenticated = require("../middleware/auth");
// router.get("/all",getusers);
//example:-http://localhost:4000/userid/id=aksh userid k baad vala id hoga
router.get("/logout",logout);
router.get("/me",isAuthenticated,getMyProfile);
router.post("/new",register);
router.post("/login",login);
module.exports = router;