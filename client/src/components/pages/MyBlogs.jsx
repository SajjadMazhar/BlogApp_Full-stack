import { Stack } from '@mui/material'
import React, { useContext } from 'react'
import blogContext from '../../context/BlogContext'
import userContext from '../../context/UserContext'
import BlogCard from '../BlogCard'

const MyBlogs = () => {
  const {blogs} = useContext(blogContext)
  const {userDetails} = useContext(userContext)
  if(blogs.length !== 0) console.log(blogs);
  return (
    <Stack spacing={4}>
        {blogs.length !== 0?
          blogs.filter(blog=> blog.userId === userDetails.id)
          .map(blog=> <BlogCard blog={blog} key={blog.id+blog.title+"user"}/>)
          :""
        }
    </Stack>
  )
}

export default MyBlogs
