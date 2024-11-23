import  jwt  from "jsonwebtoken";
import { User } from "../models/User.model.js";

const AuthCheck = async (req, res, next) => {
    try {

        const {token} = req.cookies
        if (!token) {
            throw new Error("Token Is not there");
            
        }

        const decodedMessage = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await User.findById(decodedMessage._id)
        req.user = user;
        next()
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


export {AuthCheck}