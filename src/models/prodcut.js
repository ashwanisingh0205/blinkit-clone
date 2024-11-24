import mongoose from "mongoose";

const productschema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    discountPrice:{type:Number},
    quantity:{type:String,required:true},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categoryschema',
        required:true
    }
})
const Product=mongoose.model('Product',productschema)
export default Product;