const app=require("./app");
const DBconnect=require("./data/database");
DBconnect();
app.listen(process.env.PORT,()=>{
    console.log(`server is working on port ${process.env.PORT}`);
})