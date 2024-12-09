import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        require:false,
        default:"This is default description Please change this !! Enjoy the VidEcho"
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    VideoOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
        }
    ],
    VideoSource:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
})



const Video = mongoose.model('Video',VideoSchema)

export {Video}