import mongoose from 'mongoose';

const CommunityPostSchema = new mongoose.Schema({

    Information:{
        type:String,
        required:true,
        default:"Hey this is my Community Post"
    },
    Image:{
        type:String,
        required:false
    },
    postBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ],
    comments:[
        {
             type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]

}, {
    timestamps: true
});

const CommunityPost = mongoose.model('CommunityPost', CommunityPostSchema);

export { CommunityPost };
