const express=require("express");
const router=require("./routes/user");
const {config}=require("dotenv");
const cookieParser = require("cookie-parser");
const taskrouter=require("./routes/task");
const {errorMiddleware} = require("./middleware/error");
const cors=require("cors");
const app=express();
config({
    path:"./data/config.env"
});
// middleware
app.use(express.json());//fpr accessing values from req.body4
app.use(cookieParser());
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use("/api/v1/users",router);
app.use("/api/v1/tasks",taskrouter);
app.get("/",(req,res)=>{
    res.send("hello");
});
//error handler middleware
app.use(errorMiddleware);
module.exports=app;