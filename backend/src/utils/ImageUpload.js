import cloudinary from 'cloudinary'
import { configDotenv } from "dotenv";
import fs from 'fs'
configDotenv()

const cloudinaryConfigration = cloudinary.v2.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})

const UploadImage = async (ImagePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(ImagePath,{
            resource_type:'image'
        })  

        console.log(result.url)
        fs.unlinkSync(ImagePath)

        return result.url
    } catch (error) {
        fs.unlinkSync(ImagePath)
        console.log(error)
        throw new Error("Error:",error.message);
    }
}
const UploadVideo = async (videoPath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(videoPath,{
            resource_type:'video'
        })  

        console.log(result.url)
        fs.unlinkSync(videoPath)

        return result.url
    } catch (error) {
        fs.unlinkSync(videoPath)
        console.log(error)
        throw new Error("Error:",error.message);
    }
}

// UploadVideo.




export {cloudinaryConfigration,UploadImage,UploadVideo}

