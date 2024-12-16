import cloudinary from 'cloudinary'
import { configDotenv } from "dotenv";
import fs from 'fs'
configDotenv()

const cloudinaryConfigration = cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

const UploadImage = async (ImagePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(ImagePath, {
            resource_type: 'image'
        })

        console.log("Image Uploaded")
        // console.log(result.url)
        fs.unlinkSync(ImagePath)
        
        return result
    } catch (error) {
        fs.unlinkSync(ImagePath)
        console.log(error)
        throw new Error("Error:", error.message);
    }
}

const UploadVideo = async (videoPath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(videoPath, {
            resource_type: 'video'
        })
        
        // console.log(result.url)
        console.log("Video Uploaded")
        fs.unlinkSync(videoPath)

        return result
    } catch (error) {
        fs.unlinkSync(videoPath)
        console.log(error)
        throw new Error("Error:", error.message);
    }
}

async function getVideoAllDetailsCloud(publicId) {
    try {
        const resource = await cloudinary.v2.api.resource(publicId, {
            resource_type: 'video',
            context: true,
            media_metadata: true

        });

        return resource;
    } catch (error) {
        console.error('Error fetching video details:', error);
        throw new Error(error.message);
    }
}

async function deleteVideo(publicId) {
    try {
        const result = await cloudinary.v2.uploader.destroy(publicId, {
            resource_type: 'auto',

        })
        console.log('Video Deleted')
        return result;
    } catch (error) {
        console.error('Error deleting video:', error);
        throw new Error("Erorr", error.message);
    }
}

const GetDetailsFromUrl = async (url) => {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.substring(0, lastPart.lastIndexOf('.'));
    const allDetails = getVideoAllDetailsCloud(publicId)
    return allDetails;

}

// UploadVideo.




export { cloudinaryConfigration, UploadImage, UploadVideo, getVideoAllDetailsCloud, deleteVideo,GetDetailsFromUrl }

