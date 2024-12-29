import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB  from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";

dotenv.config();

//app configuration
const PORT =process.env.PORT || 7000
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
//db connection
connectDB();
//cloudinary connection
connectCloudinary()

//controllers
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)


//server starting
app.listen(PORT,(req,res)=>{
  console.log("server started at",PORT)
})
