const express=require('express')
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose')
const userRouter=require('./Route/UserRoute');
const cookieParse=require('cookie-parser')
const fileUpload=require("express-fileupload");
const cloudinary=require('cloudinary').v2;
const cors=require('cors');
const jobRouter=require('./Route/JobRoute')
const cookieParser = require('cookie-parser');
const ApplicationRouter=require('./Route/Applicationroute');          
cloudinary.config({ 
  cloud_name: 'dneeum0v1', 
  api_key: '951164984623356', 
  api_secret: 'YC86zF3N1b5Ue0EhxX5GjK2SoOg' 
});
const connect=async()=>{
    try{
    await mongoose.connect("mongodb+srv://yashverma:planyash@cluster0.8geujke.mongodb.net/?retryWrites=true&w=majority").then(
console.log("connected")

    )
}catch(err){
        console.log(err);
    }
}
app.use(cors({origin:"http://localhost:5173",methods:["GET","POST","PUT","DELETE"],credentials:true}))
app.use(fileUpload({useTempFiles:true}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
;
app.use("/api/auth",userRouter);
app.use("/api/jobs",jobRouter)
app.use('/api/application',ApplicationRouter);
dotenv.config();
app.listen(8000,()=>{
    connect();
    console.log("helllo"+8000);  
})  