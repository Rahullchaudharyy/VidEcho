import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    Video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",
        required:true
    },
    TextContent:{
        type:String,
        required:true,      
    },
    commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    parentComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    likes:[{
        type:mongoose.Schema.Types.ObjectId, 
    }],
    status:{
        type:String,
        enum:["comment","reply"]
    }


},{
    timestamps:true
})

const Comment = mongoose.model('Comment',CommentSchema)

export {Comment}

