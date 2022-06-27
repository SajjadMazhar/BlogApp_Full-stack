const multer = require("multer")

const blogStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/blogposts")
    },
    filename:(req, file, cb)=>{
        const orgName = file.originalname.split(".")
        cb(null, Date.now()+Math.random()*10000+"."+orgName[orgName.length-1])
    },
    
})

const profileStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/profiles")
    },
    filename:(req, file, cb)=>{
        const orgName = file.originalname.split(".")
        cb(null, Date.now()+Math.random()*10000+"."+orgName[orgName.length-1])
    },
    
})

const blogUpload = multer({storage:blogStorage})
const profileUpload = multer({storage:profileStorage})

module.exports = {
    blogUpload, profileUpload
}