import express from 'express'
import { AuthCheck } from '../Middlewares/AuthCheck.js'
import { upload, VideoUploader } from '../Middlewares/Multer.js'
import { UploadImage, UploadVideo } from '../utils/ImageUpload.js'
import { fileTypeFromBuffer } from 'file-type'; // Correct ES Module import
import { Video } from '../models/Video.model.js';
import streamifier from 'streamifier';

const VideoUploadRouter = express.Router()

VideoUploadRouter.post('/api/video/upload', AuthCheck, VideoUploader.fields([{ name: 'VideoSource' }, { name: 'thumbnail' }]), async (req, res) => {
    try {
        const LoggedInUser = req.user;
        const { Title, description, tags } = req.body;
        const { VideoSource, thumbnail } = req.files;
        console.log(VideoSource)
        // const fileBuffer = req.file.buffer; // Get file buffer from the request
        // const type = await fileTypeFromBuffer(fileBuffer); // Check the file type

        // if (!type || !['image/jpeg', 'image/png', 'video/mp4'].includes(type.mime)) {
        //     return res.status(400).json({ message: 'Invalid file type!' });
        // }

        if (!Title || !description) {
            throw new Error("Title and description are Must");
        }
        const VideoUploadOnCloud = await UploadVideo(VideoSource[0].path)
        const ImageUploadOnCloud = await UploadImage(thumbnail[0].path)

        const video = new Video({
            Title,
            description,
            tags:tags|'',
            VideoSource:VideoUploadOnCloud,
            thumbnail:ImageUploadOnCloud,
            VideoOwner:LoggedInUser._id

        })

        await video.save()

        
        res.status(201).json({
            message:"Video Uploaded Sucessfully"
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
})


export { VideoUploadRouter }