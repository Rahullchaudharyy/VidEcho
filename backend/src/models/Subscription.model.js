import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({


    Subscriber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
},{timestamps:true})

const Subscription = mongoose.model('Subscription',SubscriptionSchema)