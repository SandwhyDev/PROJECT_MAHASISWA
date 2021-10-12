const multer = require('multer');
const path = require('path');

const uploadStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname, "../static/uploads/avatar"))
    },
    filename : function(req,file,cb){
        cb(null, file.originalname)
    }
})

const avatarUpload = multer({storage : uploadStorage})

module.exports = avatarUpload