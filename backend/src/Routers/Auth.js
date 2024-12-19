import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/User.model.js';
import jwt from 'jsonwebtoken'
import { AuthCheck } from '../Middlewares/AuthCheck.js';
import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
import { upload } from '../Middlewares/Multer.js';
import { UploadImage } from '../utils/ImageUpload.js';
configDotenv()



const AuthRouter = express.Router()

AuthRouter.post('/api/auth/signup', upload.single('avatar'), async (req, res) => {
    try {

        const { email, password, fullName } = req.body;
        const avatar = req.file;
        // console.log(avatar)
        const avatarUrl = await UploadImage(avatar.path)

        // const avatar= req.
        if (!email || !password || !fullName) {
            return res.status(400).json({
                message: "Please enter the neccesary fields !!"
            })
        }

        const UserExists = await User.find({ email: email })
        if (UserExists.length > 0) {
            // console.log(UserExists)
            throw new Error("User Already Exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const RandomUserNameGen = async (fullName) => {
            try {
                fullName = fullName.replace(/\s+/g, '');
                let uniqueusername;
                const user = await User.find({}, 'username')
                const existingUsernames = user.map((user) => user.username);
                let attempts = 0;

                do {
                    const randomNumber = Math.floor(Math.random() * 10000);
                    uniqueusername = `${fullName}${randomNumber}`;
                    // console.log(uniqueusername)
                    attempts++
                } while (existingUsernames.includes(uniqueusername) && attempts < 15);

                if (attempts === 15) {
                    throw new Error("Can't Generate the Usernmae");
                }
                return uniqueusername
            } catch (error) {
                res.json(error.message)
            }

        }
        const uniqueusername = await RandomUserNameGen(fullName)
        // console.log(avatarUrl)
        const user = new User({
            email,
            fullName,
            password: hashedPassword,
            username: uniqueusername,
            avatar: avatarUrl.url
        })

        await user.save()
        // Sending Email 
        if (process.env.NODE_ENV != 'development') {



            const auth = nodemailer.createTransport(
                {
                    service: 'gmail',
                    secure: true,
                    port: 465,
                    auth: {
                        user: process.env.SENDER_EMAIL,
                        pass: process.env.PASS
                    }
                }
            )
            const reciever = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome to VidEcho – Your New World of Video Entertainment!',
                text: `Hi ${user.fullName},

            We’re thrilled to have you join VidEcho, the platform where creativity meets community. 🌟
            
            Whether you're here to discover amazing content, showcase your own creations, or connect with like-minded individuals, VidEcho is built for you.
            
            Start exploring now to:
            🎬 Watch and enjoy content from diverse creators.
            📹 Share your unique ideas with the world.
            🤝 Build a following and grow your influence.
            
            Your journey to creating, connecting, and enjoying starts here. Welcome aboard!
            
            Cheers,
            The VidEcho Team`
            }

            auth.sendMail(reciever, (err, emailResponse) => {
                if (err) {
                    throw new Error(err.message);
                }
                console.log("Mail Sent")
            })


        }

        res.status(201).json({
            message: 'SignedUp successfully !! '
        })
    } catch (error) {
        res.status(400).json({
            message: "Error :" + error.message
        })
    }
})
AuthRouter.post('/api/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter the Vlaue !! '
            })
        }

        const user = await User.findOne({ email }).select('password')
        if (!user) {
            return res.status(400).json({
                message: 'Invallid Credentials'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invallid Credentials !"
            })
        }

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production', // Secure in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(200).json({
            message: 'LoggedIn successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
})
AuthRouter.get('/api/auth/profile', AuthCheck, async (req, res) => {
    try {
        const user = req.user
        res.status(200).json(
            {
                data: user
            }
        )
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
AuthRouter.post('/api/auth/resetPassword', async (req, res) => {
    try {
        const { email, oldpassword, newpassword } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Please enter the email"
            })
        }

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: "User Does not exist ."
            })
        }
        const isPasswordCorrect = await bcrypt.compare(oldpassword, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invallid Credentials "
            })
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10)

        await User.findByIdAndUpdate({ _id: user._id }, {
            password: hashedPassword
        })
        // Sending Email 
        const auth = nodemailer.createTransport(
            {
                service: 'gmail',
                secure: true,
                port: 465,
                auth: {
                    user: process.env.SENDER_EMAIL,
                    pass: process.env.PASS
                }
            }
        )

        const receiver = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Updated Successfully',
            text: `Hi ${user.fullName},
        
        Your password has been updated successfully. If you didn't make this change, please contact our support team immediately.
        
        Stay secure,  
        The VidEcho Team`
        };


        auth.sendMail(receiver, (err, emailResponse) => {
            if (err) {
                throw new Error(err.message);
            }
            console.log("Mail Sent")
        })

        res.status(201).json({
            message: 'Password Updated successfully'
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
AuthRouter.post('/api/auth/signout',async (req,res) => {
    try {
        const token = req.cookies.token;
        res.cookie('token',null)
        res.status(200).json({
            message:'Signed Out successfully  !!'
        })
    } catch (error) {
       res.status(400).json({
        message:'Error'+error.message
       }) 
    }
})

export { AuthRouter }


