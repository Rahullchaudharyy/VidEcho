


import jwt from 'jsonwebtoken'
import { User } from '../models/User.model.js'


const AuthCheck = async (req,res,next) =>{
    try {

        const {token } = req.cookies
        if (!token) {
            return res.status(404).json({
                message:'Invallid token'
            })
        }

        const decodedMessage = await jwt.verify(token,process.env.JWT_SECRET_KEY)

        const user = await User.findById({
            _id:decodedMessage._id
        })

        req.user = user;
        next()
    } catch (error) {
        res.status(402).json({
            message:error.message
        })
    }
}
export {AuthCheck}

