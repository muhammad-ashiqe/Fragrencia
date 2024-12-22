import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  cartData:{type:Object,default:{}} //create an object with empty value for the user
},{minimize:false}) // it will allow to create empty values 

const userModel =mongoose.models.user || mongoose.model("user",userSchema)

export default userModel;