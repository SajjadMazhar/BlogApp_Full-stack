const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const router = require('express').Router();


router.post("/", async(req, res)=>{
    const {comment} = req.body
    const id = req.userValues.id
    if(!(comment && id)) return res.status(400).json({
        status:"bad request", msg:"provide comment please"
    })
    try {
        const comment = await prisma.comment.create({
            data:{
                comment,
                userId:id
            }
        })
        res.status(201).json({
            status:"created", comment
        })
    } catch (error) {
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
})

module.exports = router