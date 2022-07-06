import { Stack } from '@mui/material'
import React, { useContext } from 'react'
import blogContext from '../../context/BlogContext'
import BlogCard from '../BlogCard'

const Trash = () => {
  const {blogs} = useContext(blogContext)

  return (
    <Stack spacing={4}>
        {
        blogs.length !== 0?
          blogs.filter(blog=>{
            if(blog.trashed){
              return blog
            }else{
              return false
            }
          }).map(blog=>
            <BlogCard blog={blog} key={blog.id+blog.title}/>
          ):""
        }
    </Stack>
  )
}

export default Trash
