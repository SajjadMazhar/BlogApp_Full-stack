const { PrismaClient } = require("@prisma/client")
const { updatingBlogReaction } = require("../services/reaction.services")
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
        console.log(presentReaction)
        if(presentReaction.length === 0){
            reaction = await prisma.reaction.create({
                data:{
                    liked, disliked, userId:req.userValues.id,
                    blogId
                }
            })
            blog = await updatingBlogReaction(presentReaction, liked, disliked, blogId, reaction.id)
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
        // reaction = await prisma.reaction.update({
        //     where:{
        //         id:presentReaction[0].id
        //     },
        //     data:{
        //         liked, disliked
        //     }
        // })
        // const likedCount = await prisma.reaction.findMany({
        //     where:{
        //       blogId,
        //       liked:true
        //     },
        // })
        // const dislikedCount = await prisma.reaction.findMany({
        //     where:{
        //       blogId,
        //       disliked:true
        //     },
        // })
        // const blog = await prisma.blog.update({
        //     where:{
        //         id:blogId
        //     },
        //     data:{
        //         likes:likedCount.length,
        //         dislikes:dislikedCount.length
        //     }
        // })
        // console.log(likedCount.length)
        blog = await updatingBlogReaction(presentReaction, liked, disliked, blogId)
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