const { PrismaClient } = require("@prisma/client")
const {blogUpload} = require("../middlewares/multer.middleware")
const prisma = new PrismaClient()
const { verifyToken, confirmSelf } = require("../middlewares/user.middleware")

const router = require("express").Router()

router.post("/post", blogUpload.single("images"), async(req, res)=>{
    const {title, content} = req.body
    console.log(req.file)
    // const imgPaths = req.files.map(file=>{
    //     return "/"+file.filename
    // })
    // return console.log(content)
    if(!(title&&content)){
        return res.status(400).json({
            status:"error", msg:"title and content is mandetory"
        })
    }

    try {
        const blog = await prisma.blog.create({
            data:{
                title, content, images:"/"+req.file.filename, userId:req.userValues.id
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

router.delete("/post/:id", confirmSelf, async(req, res)=>{
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
                user:true,
                comments:true
            }
        })
        const reactions = await prisma.reaction.findMany({
            where:{
                userId:req.userValues.id,
            }
        })
        res.status(200).json({
            status:"success", blogs, userId:req.userValues.id, reactions
        })
    } catch (error) {
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
})

router.post("/save/:id", async(req, res)=>{
    const id = parseInt(req.params.id)
    try {
        const blog = await prisma.blog.findUnique({where:{id}})
        const updatedBlog = await prisma.blog.update({where:{id}, data:{saved:blog.saved?false:true}})
        res.json({status:"success", blog:updatedBlog})
    } catch (error) {
        res.status(500).json({status:"failed", error:error.message})
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

router.delete("/comment/:comId/:userId", async(req, res)=>{
    
    const {comId, userId} = req.params
    console.log(comId, userId)
    if(req.userValues.id !== parseInt(userId)) return res.status(400).json({
        status:"error", msg:"you are not allowed to delete"
    })
    try {
        await prisma.comment.delete({
            where:{
                id:parseInt(comId)
            }
        })
        res.json({
            status:"success", msg:"deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
    

})

module.exports = router