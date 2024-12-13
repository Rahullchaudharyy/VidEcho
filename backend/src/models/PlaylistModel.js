import mongoose from "mongoose"; 
const PlayListSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Playlist Title/name is required'],
        default:"Watch Leter"
    },
    playlistby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User is Required to make playlist']
    },
    description:{
        type:String,
        maxLength:[200,'Max length of description is 200 .']
    },
    videos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    playlitViews:{
        type:Number,
        default:0,
    }
},{timestamps:true})



const Playlist = mongoose.model('Playlist',PlayListSchema);
 
export {Playlist}


