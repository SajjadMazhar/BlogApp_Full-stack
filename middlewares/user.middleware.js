require("dotenv").config()
const jwt = require("jsonwebtoken")
exports.verifyToken = (req, res, next)=>{
    const auth = req.headers.authorization
    if(!auth){
        res.status(400).json({
            status:"auth error", msg:"could not find token"
        })
    }

    const token = auth.split(" ")[1]
    const decoded = jwt.verify(token, process.env.SECRET)
    req.userValues = decoded
    next()
}