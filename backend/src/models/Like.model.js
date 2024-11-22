import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video'
    },
    Comments:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    },
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    communiyPost:{
            type:mongoose.Schema.Types.ObjectId,
        ref:'CommunityPost'
    }
},
{
    timestamps:true
}
)

const Like = mongoose.model('Like',LikeSchema)

export {Like}


