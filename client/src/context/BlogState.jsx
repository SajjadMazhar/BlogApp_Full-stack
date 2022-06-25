import React, {useContext, useEffect, useState} from 'react'
import blogContext from './BlogContext'
import userContext from './UserContext'

const BlogState = ({children}) => {
    const {getFromLocal, navigate, setIsLoggedIn, fetchUser, userDetails} = useContext(userContext)
    const [blogs, setBlogs] = useState([])
    const [comments, setComments] = useState([])
    const [isLiked, toggleIsLiked] = useState(false)
    const [isDisliked, toggleIsDisliked] = useState(false)
    const [blogInput, setBlogInput] = useState({blogTitle:"", blog:""})
    const [editBlogInput, setEditBlogInput] = useState({blogTitle:"", Blog:""})
    const [editing, setEditing] = useState(false)
    const [updatingId, setUpdatingId] = useState(null)
    const [commentInput, setCommentInput] = useState("")

    // fetch all blogs
    const fetchBlogs = async ()=>{
        const token = getFromLocal()
        const resp = await fetch("/blog/post", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            }
        })
        const data = await resp.json();
        // console.log(data)
        const userId = data.userId
        const reactions = data.reactions
        
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

    const fetchComments = async()=>{
        // to be continued
    }
    const handleOnPostBlog = async()=>{
        const token = getFromLocal()
        await fetch("/blog/post", {
            method:"POST", 
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            },
            body:JSON.stringify({title:blogInput.blogTitle, content:blogInput.blog})
        })
        navigate("/")
        fetchBlogs()

    }

    const toggleEditing = (id)=>{
        setEditing(prev=> prev?false:true)
        const blog = blogs.find(blog=> (blog.id===id))
        setUpdatingId(id)
        console.log(blog)
        setEditBlogInput({blogTitle:blog.title, blog:blog.content})
    }

    const handleOnUpdate = async()=>{
        const token = getFromLocal()
        await fetch("/blog/post/"+updatingId, {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            },
            body:JSON.stringify({title:editBlogInput.blogTitle, content:editBlogInput.blog})
        })
        setEditing(false)
        fetchBlogs()
        
    }

    const deleteBlog = async(id, userId)=>{
        if(userId !== userDetails.id) return;
        console.log(id, userDetails.id)
        const token = getFromLocal()
        const resp = await fetch("/blog/post/"+id, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            }
        })
        const {status} = await resp.json()
        if(status !== "success"){
            return
        }
        fetchBlogs()
    }


    const toggleSaveBlog = async(id)=>{
        const token = getFromLocal()
        const resp = await fetch("/blog/save/"+id, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            }
        })
        fetchBlogs()
        return
    }

    const reactOnBlog = async(blogId, reaction)=>{
        const token = getFromLocal()
        await fetch("/reaction/post/"+blogId, {
            method:"POST", 
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            },
            body:JSON.stringify({[reaction]:true})
        })
        fetchBlogs()
    }

    const handleOnComment = async(blogId)=>{
        const token = getFromLocal()
        const resp = await fetch("/comment"+blogId, {
            method:"POST", 
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            },
            body:JSON.stringify({comment:commentInput})
        })
        const comment = await resp.json()
        if(comment.status !== 'created') return;
        fetchComments()
    }



    useEffect(()=>{
        if(getFromLocal()){
            if(['/login','/signup'].includes(window.location.pathname)){
                navigate("/")
            }
            setIsLoggedIn(true)
            fetchUser()
            fetchBlogs()
        }
        else if(!getFromLocal() && ['/', '/newblog', '/yblogs', '/saved', '/profile', '/trash'].includes(window.location.pathname)){
            setIsLoggedIn(false)
            navigate("/login")
        }
        // eslint-disable-next-line
    },[navigate, setIsLoggedIn])

    const values = {
        blogs,
        isLiked,
        isDisliked,
        toggleIsDisliked,
        toggleIsLiked,
        reactOnBlog,
        blogInput,
        setBlogInput,
        handleOnPostBlog,
        editing,
        setEditing,
        editBlogInput,
        setEditBlogInput,
        handleOnUpdate,
        toggleEditing,
        deleteBlog,
        toggleSaveBlog,
        commentInput,
        setCommentInput,
        handleOnComment
    }

  return (
    <blogContext.Provider value={values}>
        {children}
    </blogContext.Provider>
  )
}

export default BlogState
