import mongoose from "mongoose";
// basic schema
const branchschema=new mongoose.Schema({
    name:{type:String},
    location:{
        latitude:{type:Number},
    longitude:{type:Number}
},
address:{type:String},
deliveryPartners:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'deliveryschema'

    }
]
}); 
const Branch=mongoose.model('Branch',branchschema)
export default Branch;