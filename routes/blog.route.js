const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const router = require("express").Router()

router.post("/post", async(req, res)=>{
    const {title, content, images } = req.body
    if(!(title&&content)){
        return res.status(400).json({
            status:"error", msg:"title and content is mandetory"
        })
    }

    try {
        const blog = await prisma.blog.create({
            data:{
                title, content, images, userId:req.userValues.id
            }
        })
        res.status(201).json({
            status:"success", blog
        })
    } catch (error) {
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
})

router.delete("/post/:id", async(req, res)=>{
    if(!(req.params.id)) return res.status(400).json({
        status:"error", msg:"id must be provided"
    })
    const id = parseInt(req.params.id)
    try {
        const blog = await prisma.blog.delete({
            where:{id}
        })
        res.status(200).json({
            status:"success", blog
        })
    } catch (error) {
        res.status(500).json({
            status:'failed', error:error.message
        })
    }
})

router.get("/post", async(req, res)=>{
    try {
        const blogs = await prisma.blog.findMany()
        res.status(200).json({
            status:"success", blogs
        })
    } catch (error) {
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
})

module.exports = router