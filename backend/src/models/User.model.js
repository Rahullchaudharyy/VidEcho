import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        required:true
    },
    watchHistory:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",
        required:true
        }
    ],
    likedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    UsersContent:[
        {
             type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    UsersPlaylist:[
        {
            type:mongoose.Schema.Types.ObjectId,
           ref:"Playlist"
        }
    ],
    communityPosts:[
        {
              type:mongoose.Schema.Types.ObjectId,
           ref:"CommunityPost"
        }
    ],
    Userlives:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ]
},
{
    timestamps:true
})


const User = mongoose.model('User',UserSchema)

export {User}


