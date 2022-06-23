const { PrismaClient } = require("@prisma/client")
const { verifyToken } = require("../middlewares/user.middleware")
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
        await prisma.reaction.deleteMany({
            where:{
                blogId:id
            }
        })
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
        const blogs = await prisma.blog.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                user:true
            }
        })
        const reactions = await prisma.reaction.findMany({
            where:{
                userId:req.userValues.id,
            }
        })
        console.log(reactions)
        res.status(200).json({
            status:"success", blogs, userId:req.userValues.id, reactions
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
})

router.patch("/post/:id", async(req, res)=>{
    const id = parseInt(req.params.id)
    const {title, content} = req.body
    if(!(title&&content)){
        return res.status(400).json({
            status:"error", msg:"please enter title and content"
        })
    }
    try {
        const blog = await prisma.blog.update({
            where:{
                id
            },
            data:{
                title, content
            }
        })
        res.json({
            status:"success", blog
        })
    } catch (error) {
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
})

module.exports = router