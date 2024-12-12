import express from 'express'
import { AuthCheck } from '../Middlewares/AuthCheck.js'
import { Video } from '../models/Video.model.js';
import { upload } from '../Middlewares/Multer.js'
import { deleteVideo, GetDetailsFromUrl, UploadImage } from '../utils/ImageUpload.js';
import { Comment } from '../models/Comment.model.js';
const VideoRouter = express.Router()
// feed pagination
VideoRouter.get('/api/videos/feed/', AuthCheck, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;


        const allVideos = await Video.find({})
            .limit(limit)
            .skip(skip)
        res.status(200).json({
            message: allVideos
        })


    } catch (error) {
        res.status(500).json({
            message: 'Error ' + error.message,

        })
    }
})
// get specific video
VideoRouter.get('/api/video/watch/:videoId', AuthCheck, async (req, res) => {
    try {

        const LoggedInUser = req.user;
        const VideoId = req.params.videoId;
        const video = await Video.findById({ _id: VideoId })
        video.views = parseInt(video.views) + 1;
        console.log(parseInt(video.views))


        // if (LoggedInUser.watchHistory.filter((elem) => elem == VideoId) !== LoggedInUser.watchHistory.filter((elem) => elem == VideoId)) {
        //     LoggedInUser.watchHistory.push(video._id)
        //     // const Lers = LoggedInUser.watchHistory.filter((elem) => elem == VideoId)


        // }
        // if (!LoggedInUser.watchHistory.filter(elem=> elem == VideoId)) {
        //     LoggedInUser.watchHistory.push(video._id)

        // }


        await LoggedInUser.save()
        await video.save()
        res.status(200).json({ data: video })
    } catch (error) {
        res.status(500).json({
            message: 'Error ' + error.message,
        })
    }
})
// Edit video detials 
VideoRouter.patch('/api/video/edit/:videoId', AuthCheck, upload.single('thumbnail'), async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const LoggedInUser = req.user;
        const thumbnail = req.file;
        const video = await Video.findById(videoId)
        const { title, description } = req.body;
        console.log(LoggedInUser._id)
        console.log(video.VideoOwner)
        // console.log(!LoggedInUser._id === video.VideoOwner)
        if (LoggedInUser._id.toString() !== video.VideoOwner.toString()) {
            return res.status(402).json({
                message: 'Invalid Request to edit !!'
            })
        }

        // console.log(thumbnail)

        const uploadThumbnail = await UploadImage(thumbnail.path);
        // console.log(uploadThumbnail)


        if (title == ' ' || description == ' ') {
            return res.status(501).json({
                message: 'title & description are required'
            })
        }
        video.thumbnail = uploadThumbnail.url;
        video.Title = title;
        video.description = description;

        await video.save()
        res.status(201).json({
            message: 'Updated'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
})
// delete video
VideoRouter.delete('/api/video/delete/:videoId', AuthCheck, async (req, res) => {
    try {
        const LoggedInUser = req.user;

        const videoId = req.params.videoId;
        const title = req.body.title;
        const video = await Video.findById(videoId);

        if (LoggedInUser._id.toString() !== video.VideoOwner.toString()) {
            return res.status(400).json({
                message: "Could'nt Delete Invalid Request"
            })
        }

        if (video.Title != title) {
            return res.status(400).json({
                message: "Please write valid title"
            })
        }



        // const data =  GetDetailsFromUrl(video.VideoSource)
        // await deleteVideo(data.url)

        await Video.deleteOne({ _id: video._id })
        res.status(201).json({
            message: 'Video Deleted'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
// Like on the video
VideoRouter.post('/api/video/like/:videoId', AuthCheck, async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const user = req.user;
        const video = await Video.findById(videoId);
        let message;

        if (!video) {
            return res.status(404).json({
                message: 'Not found Video'
            })
        }

        if (video.likes.includes(user._id)) {
            video.likes.pull(user._id)
            message = 'Video Unliked Successfully !! '
        } else {
            video.likes.push(user._id)
            message = 'Video liked Successfully !! '
        }


        await video.save();

        res.status(201).json({
            message: message
        })



    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Internal Server Error"
        })
    }
})
// Comment on video 
VideoRouter.post('/api/video/comment/:videoId', AuthCheck, async (req, res) => {
    try {
        const user = req.user;
        const videoId = req.params.videoId;

        const TextContent = req.body.TextContent;
        const video = await Video.findById(videoId);

        if (!TextContent) {
            return res.status(404).json({
                message: 'Enter Text'
            })
        }

        if (!video) {
            return res.status(404).json({
                message: 'Not found'
            })
        }

        const commented = new Comment({
            commentBy: user._id,
            Video: video._id,
            TextContent: TextContent,
            status:"comment"

        })

        await commented.save();

        video.comments.push(commented._id)

        await video.save()
        res.status(201).json({
            message: 'Successfully commented'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
})
// Reply on the comment 
VideoRouter.post('/api/video/reply/:videoId/:parantCommentId', AuthCheck, async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const text = req.body.text;
        const parantCommentId = req.params.parantCommentId;
        const user = req.user;


        if (!text) {
            return res.status(400).json({
                message: 'Please Enter text .'
            })
        }
        const video = await Video.findById(videoId)
        if (!video) {
            res.status(404).json({
                message:"Not Found ."
            })
        };
        const comment = await Comment.findById(parantCommentId);


        const Reply = new Comment({
            Video:video._id,
            parentComment:parantCommentId,
            TextContent:text,
            commentBy:user._id,
            status:"reply"
        })
        await Reply.save()
        
        comment.replies.push(Reply._id)
        await comment.save()

        res.status(201).json({
            message:'Replied Successfully !!'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
})
// get all reply on the specific comment 
VideoRouter.get('/api/comment/replies/:commentId',AuthCheck,async (req,res) => {

    try {
   const commentid = req.params.commentId;
   const comment = await Comment.findById(commentid);
//    console.log(comment)
   const replies  = comment.replies;
   const allReplies = await Comment.find({
    _id:{$in:replies}
   })

   res.status(200).json({
    message:"All replies of this Perticuller comment-" + `*${comment.TextContent}*`,
    data:allReplies
   })
    } catch (error) {
        res.status(500).json({
            message:"error :" + error.message
        })
    }
    
})
// get all comment on specific video
VideoRouter.get('/api/video/comments/:videoId',AuthCheck,async (req,res) => {
    try {
        const videoId = req.params.videoId;
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                message:"Cant find the video you are looking for .."
            })
        }

        const commentsIds = video.comments;
        const allcomments = await Comment.find({
            _id:{$in:commentsIds}
        })
        res.status(200).json({
            message: "All Comments on"+`'${video.Title}'`,
            data:allcomments
        })
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
})
// delete the speccicf comment
VideoRouter.delete('/api/video/comment/delete/:commentId',AuthCheck,async (req,res) => {
  try {
    const user = req.user;
    const CommentId = req.params.commentId;
    
    const comment = await Comment.findById(CommentId)
    const video = await Video.findById(comment.Video)

    if (!comment) {
        return res.status(404).json({
            message:"Not found"
        })
    }

    if (comment.commentBy.toString() !== user._id.toString()) {
        return res.status(503).json({
            message:"Invalid Request"
        })
    }
    
   await comment.deleteOne()
   video.comments.pull(comment._id)
    await video.save()
   res.status(201).json({
    message:"Comment Deleted"
   })

  } catch (error) {
     res.status(error.statusCode).json({
        message:error.message
     })
  }  
})
// Edit own comment
VideoRouter.patch('/api/video/comment/edit/:commentId',AuthCheck,async (req,res) => {
    try {
        const user = req.user;
        const comment = await Comment.findById(req.params.commentId);
        const TextContent = req.body.TextContent;
        
        if (user._id.toString() !== comment.commentBy.toString()) {
            return res.status(400).json({
                message:'Invalid Request'
            })  
        }

        comment.TextContent = TextContent;
        await comment.save()
        res.status(201).json({
            message:"Updated Sucessfully !!"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
// Like/unllike Commenet,

VideoRouter.post('/api/video/comment/like/:commentId',AuthCheck,async (req,res) => {
    try {
        const commentID = req.params.commentId;
         const comment = await Comment.findByIdAndUpdate({_id:commentID})
const user = req.user;
let message ;


         if (comment.likes.includes(user._id)) {
            comment.likes.pull(user._id)
            message = 'unlike Sucessfully '
         } else{
            comment.likes.push(user._id)
            message="liked Sucessfully"
         }

         await comment.save()

         res.status(201).json({
            message:message
         })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }    
})


export { VideoRouter }