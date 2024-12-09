import express from 'express'
import { AuthCheck } from '../Middlewares/AuthCheck.js'
import { Video } from '../models/Video.model.js';
import { upload } from '../Middlewares/Multer.js'
import { deleteVideo, GetDetailsFromUrl, UploadImage } from '../utils/ImageUpload.js';
const VideoRouter = express.Router()

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
            message:'Updated'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
})
VideoRouter.delete('/api/video/delete/:videoId',AuthCheck,async (req,res) => {
    try {
        const LoggedInUser = req.user;

        const videoId = req.params.videoId;
        const video = await Video.findById(videoId);

        if (LoggedInUser._id.toString() !== video.VideoOwner.toString()) {
            return res.status(400).json({
                message:"Could'nt Delete Invalid Request"
            })
        }

        // const data =  GetDetailsFromUrl(video.VideoSource)
        // await deleteVideo(data.url)

       await Video.deleteOne({_id:video._id})

        res.status(201).json({
            message:'Video Deleted'
        })



    } catch (error) {
        res.status(400).json({
            message: error.message
        })  
    }
})
VideoRouter.post('/api/video/like/:videoId',AuthCheck,async (req,res)=>{
    try {
        const videoId = req.params.videoId;

        const video = await Video.findById(videoId);


    } catch (error) {
        
    }
})

export { VideoRouter }