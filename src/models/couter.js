import mongoose from "mongoose";

const counterSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    sequence_value:{type:Number,default:0},
})
const counter=mongoose.model('counter',counterSchema);
export default counter;