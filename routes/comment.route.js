const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const router = require('express').Router();


router.post("/:blogId", async(req, res)=>{
    const {comment} = req.body
    const {id, name} = req.userValues
    const blogId = parseInt(req.params.blogId)
    console.log(comment, id, blogId)
    if(!(comment && id)) return res.status(400).json({
        status:"bad request", msg:"provide comment please"
    })
    try {
        const myComment = await prisma.comment.create({
            data:{
                comment,
                userId:id,
                blogId,
                userName:name
            }
        })
        res.status(201).json({
            status:"created", comment:myComment
        })
    } catch (error) {
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
})

router.get("/", async(req, res)=>{
    try {
        const comments = await prisma.comment.findMany();
        res.json({status:"success", comments})
    } catch (error) {
        res.status(500).json({status:"failed", error:error.message})
    }
})

module.exports = router