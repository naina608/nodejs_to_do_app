const express=require("express");
const router=express.Router();
const {newTask,getMyTask,updateTask,deleteTask}=require("../controllers/task");
const isAuthenticated = require("../middleware/auth");
router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMyTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(deleteTask);
module.exports=router;