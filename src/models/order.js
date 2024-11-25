import mongoose from "mongoose";
import counter from "./couter.js";
// import { type } from "node:os";

const orderSchema=new mongoose.Schema({
    orderId:{
        type:String,
        unique:true,
      
       
        
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customerschema',
        required:true,
    },
    deliveryPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'deliveryschema',
        required:true
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branch',
        required:true,
    },
    items:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            item:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            count:{
                type:Number,required:true
            }
        }
    ],
    deliveryLocation:{
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        address:{type:String},
    },
    pickupLocation:{
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        address:{type:String},
    },
    deliveryPersonalLocation:{
        latitude:{type:Number},
        longitude:{type:Number},
        address:{type:String},
    },
    status:{
        type:String,
        enum:['available','confirmed','arriving','delivered','cancelled'],
        default:'available'
    },
    totalPrice:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},

});
async function getNextSequenceValue(sequenceName){
    const sequenceDocument=await counter.findOneAndUpdate(
        {name:sequenceName},
        {$inc:{sequence_value:1}},
        {new:true,upsert:true}
    );
    return sequenceDocument.sequence_value;
}
orderSchema.pre('save',async function (next){
    if(this.isNew){
        const sequenceValue=await getNextSequenceValue('orderId');
        this.orderId=`order${sequenceValue.toString().padStart(5,'0')}`
    }
    next();
})
const Order=mongoose.model('order',orderSchema);
export default Order;