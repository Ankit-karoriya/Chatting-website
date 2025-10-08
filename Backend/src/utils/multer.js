import multer from 'multer';

const storage = multer.diskStorage({
    // store the resouse temporary in local public folder
    destination: function(req, file, cb){
        cb(null, './public/temp')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage: storage });