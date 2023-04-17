const { Errorhandler } = require("../middleware/error");
const Task=require("../models/task");
const newTask=async(req,res,next)=>{
    try {
        const {title,description}=req.body;
        await Task.create({
            title,
            description,
            user:req.user,
        });
        res.status(201).json({
            success:true,
            message:"task added successfully"
        })    
    } catch (error) {
        next(error);
    }
    
}
const getMyTask=async(req,res,next)=>{
    try {
        const id=req.user._id;
    const tasks=await Task.find({user:id});
    res.status(300).json({
        sucess:true,
        tasks
    })
    } catch (error) {
        next(error);
    }
    
}
const updateTask=async(req,res,next)=>
{
    try {
        const task=await Task.findById(req.params.id);
        if(!task){
           return next(new Errorhandler("Invalid id",404));
        }
        task.isCompleted=! task.isCompleted;
        await task.save();
        res.status(200).json({
            success:true,
            message:"Task completed successfully"
        })
        
    } catch (error) {
        next(error);
    }
   
}
const deleteTask=async(req,res,next)=>{
    try {
        const task=await Task.findById(req.params.id);
        if(!task){
            return next(new Errorhandler("Invalid id",404));
        }
        await task.deleteOne();
        res.status(200).json({
            success:true,
            message:"Task deleted successfully"
        })
    } catch (error) {
        next(error);
    }
  
}
module.exports={newTask,getMyTask,updateTask,deleteTask};