const { PrismaClient } = require("@prisma/client")
const { updatingBlogReaction, popReactioner } = require("../services/reaction.services")
const prisma = new PrismaClient()
const router = require("express").Router()

router.post("/post/:blogId", async(req, res)=>{
    let {liked, disliked} = req.body
    const blogId = parseInt(req.params.blogId)
    let blog
    try {
        const presentReaction = await prisma.reaction.findMany({
            where:{
                blogId,
                userId:req.userValues.id
            }
        })
        // console.log(presentReaction)
        if(presentReaction.length === 0){
            reaction = await prisma.reaction.create({
                data:{
                    liked, disliked, userId:req.userValues.id,
                    blogId
                }
            })
            blog = await updatingBlogReaction(presentReaction, liked, disliked, blogId, reaction.id, req.userValues.id)
            return res.status(201).json({
                status:"success", blog
            })
        }
        if(presentReaction[0].liked && liked){
            liked = false
        }
        if(presentReaction[0].disliked && disliked){
            disliked = false
        }
        if(liked && presentReaction[0].disliked){
            disliked = false
        }
        if(disliked && presentReaction[0].liked){
            liked = false
        }
       
        blog = await updatingBlogReaction(presentReaction, liked, disliked, blogId, null, req.userValues.id)
        const checkReaction = await prisma.reaction.findMany({where:{blogId, userId:req.userValues.id}})
        // console.log(checkReaction)
        if(checkReaction[0] && !checkReaction[0].liked && !checkReaction[0].disliked){
            await prisma.reaction.delete({where:{id:checkReaction[0].id}})
            blog = await popReactioner(checkReaction[0].blogId, req.userValues.id)
        }
        res.json({
            status:"success", blog
        })

    } catch (error) {
        res.status(500).json({
            status:"failed", error:error.message
        })
    }
})



module.exports= router