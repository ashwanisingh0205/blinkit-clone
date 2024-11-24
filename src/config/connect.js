import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

export const connectDB=async(uri)=>{
   
    try 
    { 
  
        await mongoose.connect(uri)
        console.log("Database connected")
    }
    catch(err){
        console.log("data base connection error",err.message)
    }
}