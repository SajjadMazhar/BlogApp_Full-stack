const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
require("dotenv").config()
const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next)=>{
    try {
        const auth = req.headers.authorization
        if(!auth){
            res.status(401).json({
                status:"unauthorized", msg:"could not find token"
            })
        }
        const token = auth.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET)
        req.userValues = decoded
        next()
    } catch (error) {
        
        res.status(500).json({
            status:500, msg:error.message
        })
    }
}

exports.confirmSelf = async(req, res, next)=>{
    const authUserId = req.userValues.id;
    const blogId = parseInt(req.params.id)
    try {
        const blog = await prisma.blog.findUnique({where:{id:blogId}});
        if(authUserId !== blog.userId) return res.status(400).json({status:"error", msg:"invalid action"})
        next()
    } catch (error) {
        res.status(500).json({status:"failed", error:error.message})
    }
}