import express from 'express'
import { ConectDatabse } from './Database/Conect.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
ConectDatabse().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`▤ Server Started ↯ on http://localhost:${process.env.PORT}`)
    })
}).catch((error)=>{
        console.log(error.message)
})

