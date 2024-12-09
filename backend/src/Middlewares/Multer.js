import multer from "multer";


const storage  = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"./public/uploads/images")
    },
    filename:function(req,file,cb) {
        cb(null,file.originalname)
    }
})
const VideoStorage  = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"./public/uploads/videos")
    },
    filename:function(req,file,cb) {
        cb(null,file.originalname)
    }
})
 const upload = multer({
    storage
})

const VideoUploader = multer({
    storage:VideoStorage,
    limits: { fileSize: 500 * 1024 * 1024 }

})

export {upload,VideoUploader}