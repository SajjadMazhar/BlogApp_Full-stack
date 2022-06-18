const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const updatingBlogReaction = async(presentReaction, liked, disliked, blogId, reactionId)=>{
    reaction = await prisma.reaction.update({
        where:{
            id:presentReaction[0]?presentReaction[0].id : reactionId
        },
        data:{
            liked, disliked
        }
    })
    const likedCount = await prisma.reaction.findMany({
        where:{
          blogId,
          liked:true
        },
    })
    const dislikedCount = await prisma.reaction.findMany({
        where:{
          blogId,
          disliked:true
        },
    })
    const blog = await prisma.blog.update({
        where:{
            id:blogId
        },
        data:{
            likes:likedCount.length,
            dislikes:dislikedCount.length
        }
    })
    return blog
}

module.exports={
    updatingBlogReaction
}