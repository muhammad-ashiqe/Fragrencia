import mongoose from "mongoose";

const connectDB =async () => {
 try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("database connected")
 }catch (error) {
  console.log("failed to connect database")
 }
};

export default connectDB;