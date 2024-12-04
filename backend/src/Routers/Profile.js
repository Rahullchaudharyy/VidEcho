import express from 'express'
import { AuthCheck } from '../Middlewares/AuthCheck.js';

const ProfileRouter = express.Router()


ProfileRouter.patch('/api/profile/edit',AuthCheck,async (req,res) => {
    try {
        const LoggedinUser = req.user;
        const UpdateFields = req.body;
        const allowedUpdate = ['fullName','avatar'];


        const isAllowed = Object.keys(UpdateFields).every((feild)=>allowedUpdate.includes(feild))

        if (!isAllowed) {
            return res.status(401).json({
                message:"Invallid Update fields "
            })
        }

        

        Object.keys(UpdateFields).forEach((key)=>LoggedinUser[key] = UpdateFields[key])

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

