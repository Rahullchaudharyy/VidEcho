// import multer from "multer";


// const storage  = multer.diskStorage({
//     destination:function(req,file,cb) {
//         cb(null,"./public/uploads/images")
//     },
//     filename:function(req,file,cb) {
//         cb(null,file.originalname)
//     }
// })
// const VideoStorage  = multer.diskStorage({
//     destination:function(req,file,cb) {
//         cb(null,"./public/uploads/videos")
//     },
//     filename:function(req,file,cb) {
//         cb(null,file.originalname)
//     }
// })
//  const upload = multer({
//     storage
// })

// const VideoUploader = multer({
//     storage:VideoStorage,
//     limits: { fileSize: 500 * 1024 * 1024 }

// })


// export {upload,VideoUploader}

import multer from "multer";
import fs from "fs";
import path from "path";

// Create directory if it doesn't exist
const createDirIfNotExist = (dir) => {
    // Use path.resolve to get the absolute path from the root of the project
    const uploadDir = path.resolve("public", dir); // Ensure this resolves from the root
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
};

// Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "uploads/images"; // Relative path inside public folder
        createDirIfNotExist(uploadPath); // Ensure directory exists
        cb(null, path.resolve("public", uploadPath)); // Correctly resolve to the absolute path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Multer for video uploads
const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "uploads/videos"; // Relative path inside public folder
        createDirIfNotExist(uploadPath); // Ensure directory exists
        cb(null, path.resolve("public", uploadPath)); // Correctly resolve to the absolute path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Multer upload configuration for images
const upload = multer({
    storage
});

// Multer upload configuration for videos with file size limit
const VideoUploader = multer({
    storage: videoStorage,
    limits: { fileSize: 500 * 1024 * 1024 }
});

export { upload, VideoUploader };
