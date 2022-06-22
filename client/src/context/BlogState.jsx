import React, {useEffect, useState} from 'react'
import blogContext from './BlogContext'

const host="http://localhost:3000/"
const BlogState = ({children}) => {
    const [blogs, setBlogs] = useState([])
    const [isLiked, toggleIsLiked] = useState(false)
    const [isDisliked, toggleIsDisliked] = useState(false)

    const fetchBlogs = async ()=>{
        const resp = await fetch(host+"blog/post")
        const data = await resp.json()
        // console.log(data.blogs)
        const blogData = data.blogs.map(blog=>{
            
        })
        setBlogs(data.blogs)
        
    }

    useEffect(()=>{
        fetchBlogs()
    },[])

    const values = {
        blogs,
        isLiked,
        isDisliked,
        toggleIsDisliked,
        toggleIsLiked
    }

  return (
    <blogContext.Provider value={values}>
        {children}
    </blogContext.Provider>
  )
}

export default BlogState
