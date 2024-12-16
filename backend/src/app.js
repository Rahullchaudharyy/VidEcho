import express, { json } from 'express'
import { ConectDatabse } from './Database/Conect.js'
import dotenv from 'dotenv'
import { AuthRouter } from './Routers/Auth.js'
import cookieparser from 'cookie-parser'
import { ProfileRouter } from './Routers/Profile.js'
import { VideoUploadRouter } from './Routers/VideoUpload.js'
import { VideoRouter } from './Routers/Video.js'
import { PlaylistRouter } from './Routers/PlaylistRouter.js'
import { SubscriptionRouter } from './Routers/SubscriptionRouter.js'
import { CommunityPostRout } from './Routers/CommunityPostRouter.js'
dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieparser())

ConectDatabse().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`▤ Server Started ↯ on http://localhost:${process.env.PORT}`)
    })
}).catch((error)=>{
        console.log(error.message)
})



app.use('/',AuthRouter)
app.use('/',ProfileRouter)
app.use('/',VideoUploadRouter)
app.use('/',VideoRouter)
app.use('/',PlaylistRouter)
app.use('/',SubscriptionRouter)
app.use('/',CommunityPostRout)


