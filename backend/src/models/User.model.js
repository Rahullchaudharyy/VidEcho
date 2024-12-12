import mongoose from "mongoose";
import validator from 'validator'
const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        lowercase: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is envalid");

            }
        }
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        // required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    likedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    UsersContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    UsersPlaylist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Playlist"
        }
    ],
    communityPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommunityPost"
        }
    ],
    Userlives: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    subscriber:[
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ]
},
    {
        timestamps: true
    })


const User = mongoose.model('User', UserSchema)

export { User }


