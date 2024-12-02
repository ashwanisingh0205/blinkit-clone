import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
    
})
const category=mongoose.model('categoryschema',categorySchema)
export default category;