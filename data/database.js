const mongoose=require("mongoose");

const DBconnect=()=>{mongoose.connect(process.env.MONGO_URL,{
    dbName:"backendapi",
}).then(()=>{
    console.log("database connected");
}).catch((e)=>{console.log(e)});
}
module.exports=DBconnect;