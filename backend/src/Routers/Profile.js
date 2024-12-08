import express from 'express'
import { AuthCheck } from '../Middlewares/AuthCheck.js';
import { upload } from '../Middlewares/Multer.js';
import { UploadImage } from '../utils/ImageUpload.js';

const ProfileRouter = express.Router()


ProfileRouter.patch('/api/profile/edit',AuthCheck,upload.fields([{name:'avatar'},{name:'coverImage'}]),async (req,res) => {
    try {
        const LoggedinUser = req.user;
        const UpdateFields = req.files;
        // console.log(UpdateFields)
        const fullname = req.body.fullName 
        // const coverImage = req.file;
        const allowedUpdate = ['fullName','avatar','coverImage'];


        const isAllowed = Object.keys(UpdateFields).every((feild)=>allowedUpdate.includes(feild))
        if (!isAllowed) {
            return res.status(401).json({
                message:"Invallid Update fields "
            })
        }


        if (UpdateFields['avatar']) {
            const avatarUrl = await UploadImage(UpdateFields['avatar'][0].path)
            LoggedinUser.avatar = avatarUrl;
        } 
        if (UpdateFields['coverImage']) {
            const coverImageURL = await UploadImage(UpdateFields['coverImage'][0].path)
            LoggedinUser.coverImage = coverImageURL;
        }

        // Object.keys(UpdateFields).forEach((key)=>LoggedinUser[key] = UpdateFields[key])

        if (fullname) {
            LoggedinUser.fullName = fullname
        }

        await LoggedinUser.save()

        res.status(201).json({
            message:'Updated Successfully !!'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

export {ProfileRouter}

