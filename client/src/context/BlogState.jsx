import React, {useEffect, useState} from 'react'
import blogContext from './BlogContext'

const host="http://localhost:3000/"
const BlogState = ({children}) => {
    const [blogs, setBlogs] = useState([])
    const [isLiked, toggleIsLiked] = useState(false)
    const [isDisliked, toggleIsDisliked] = useState(false)

    // fetch all blogs
    const fetchBlogs = async ()=>{
        const resp = await fetch(host+"blog/post", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImtoYWphIiwiZW1haWwiOiJraGFqYUBnbWFpbC5jb20iLCJpYXQiOjE2NTU5NTYzOTAsImV4cCI6MTY1NjA0Mjc5MH0.firwr5HUTnLXk0ebf38SQR9Aaw58eACqHVHUX1oueag"
            }
        })
        const data = await resp.json()
        const userId = data.userId
        const reactions = data.reactions
        console.log(reactions)
        const blogData = data.blogs.map(blog=>{
            for(let react of reactions){
                if(blog.reactionerIds.includes(userId) && react.blogId===blog.id){
                    if(react.liked){
                        return {...blog, liked:true, disliked:false}
                    }else if(react.disliked){
                        return {...blog, liked:false, disliked:true}
                    }
                }
            }
            return {...blog, liked:false, disliked:false}
        })
        setBlogs(blogData)
    }

    const reactOnBlog = async(blogId, reaction)=>{
        await fetch(host+"reaction/post/"+blogId, {
            method:"POST", 
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImtoYWphIiwiZW1haWwiOiJraGFqYUBnbWFpbC5jb20iLCJpYXQiOjE2NTU5NTYzOTAsImV4cCI6MTY1NjA0Mjc5MH0.firwr5HUTnLXk0ebf38SQR9Aaw58eACqHVHUX1oueag"
            },
            body:JSON.stringify({[reaction]:true})
        })
        fetchBlogs()
    }

    const createABlog = async()=>{
        await fetch(host+"blog/post/", {
            method:"POST", 
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImtoYWphIiwiZW1haWwiOiJraGFqYUBnbWFpbC5jb20iLCJpYXQiOjE2NTU5NTYzOTAsImV4cCI6MTY1NjA0Mjc5MH0.firwr5HUTnLXk0ebf38SQR9Aaw58eACqHVHUX1oueag"
            },
            body:JSON.stringify({title:"Navgurukul", content:"An NGO that provides tech courses to the students who can't afford higher studies"})
        })
        fetchBlogs()
    }

    useEffect(()=>{
        fetchBlogs()
    },[])

    const values = {
        blogs,
        isLiked,
        isDisliked,
        toggleIsDisliked,
        toggleIsLiked,
        reactOnBlog,
        createABlog
    }

  return (
    <blogContext.Provider value={values}>
        {children}
    </blogContext.Provider>
  )
}

export default BlogState
