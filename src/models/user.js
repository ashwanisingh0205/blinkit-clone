import mongoose from "mongoose";
// basic schema
const userschema=new mongoose.Schema({
    phone:{type:String},
    role:{type:String,
        enum:['Customer','Admin','DeliveryPartner'],
        required:true,
    },
    isActivated:{type:Boolean,default:false}
}); 

// cutomer schema
const customerschema=new mongoose.Schema({
    ...userschema.obj,
    phone:{type:Number,unique:true,required:true},
    role:{type:String,enum:['Customer'],default:'Customer'},
    livelocation:{
        latitude:{type:Number},
    longitude:{type:Number},
    isActivated:{type:Boolean,default:false}

},
address:{type:String}
});

// Delivery schema

const deliveryschema=new mongoose.Schema({
    ...userschema.obj,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:Number,unique:true,required:true},
    role:{type:String,enum:['DeliveryPartner'],default:'DeliveryPartner'},
    livelocation:{
        latitude:{type:Number},
    longitude:{type:Number},
    isActivated:{type:Boolean,default:false}
},
address:{type:String},
branch:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Branch'
},
});

// Admin schema

const Adminschema=new mongoose.Schema({
    ...userschema.obj,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['Admin'],default:'Admin'},
    isActivated:{type:Boolean,default:false}

});

export const customer=mongoose.model('customerschema',customerschema);
export const delivery=mongoose.model('deliveryschema',deliveryschema);
export const Admin=mongoose.model('Adminschema',Adminschema);
