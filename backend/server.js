import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB  from "./config/db.js";

dotenv.config();

//app configuration
const PORT =process.env.PORT || 7000
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
//db connection
connectDB();

//api end points
app.get("/",(req,res)=>{
  res.send("Api is working")
})




//server starting
app.listen(PORT,(req,res)=>{
  console.log("server started at",PORT)
})

//