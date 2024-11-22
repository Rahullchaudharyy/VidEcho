import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()


const ConectDatabse =async ()=>{
await mongoose.connect(process.env.MONGODB_URL)   
console.log("🌿 Database conneced sucssfully !!") 
}

export {ConectDatabse}


// ▤