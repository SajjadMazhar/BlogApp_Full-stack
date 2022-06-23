const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const updatingBlogReaction = async(presentReaction, liked, disliked, blogId, reactionId, userId)=>{
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
    const reactonerBlog = await prisma.blog.findUnique({
        where:{id:blogId}
    })
    let reactionerIds=reactonerBlog.reactionerIds
    if(reactonerBlog && !reactonerBlog.reactionerIds.includes(userId)){
        reactionerIds.push(userId)

    }
    const blog = await prisma.blog.update({
        where:{
            id:blogId
        },
        data:{
            likes:likedCount.length,
            dislikes:dislikedCount.length,
            reactionerIds
        }
    })
    return blog
}

const popReactioner = async(blogId, userId) =>{
   
        const reaction = await prisma.blog.findUnique({where:{
            id:blogId
        }})
        let reactionerIds = reaction.reactionerIds
        // console.log(reactionerIds)
        reactionerIds.splice(reactionerIds.indexOf(userId), 1)
        return await prisma.blog.update({
                    where:{
                        id:blogId
                    },
                    data:{
                        reactionerIds
                    }
                })
    
}

module.exports={
    updatingBlogReaction,
    popReactioner
}