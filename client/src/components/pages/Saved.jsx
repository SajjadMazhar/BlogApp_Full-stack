import { Stack } from '@mui/material'
import React, { useContext } from 'react'
import blogContext from '../../context/BlogContext'
import BlogCard from '../BlogCard'

const Saved = () => {
  const {blogs} = useContext(blogContext)
  if(blogs.length !== 0) console.log(blogs);
  return (
    <Stack spacing={4}>
        {blogs.length !== 0?
          blogs.filter(blog=> blog.saved)
          .map(blog=> <BlogCard blog={blog} key={blog.id+blog.title+"saved"}/>)
          :""
        }
    </Stack>
  )
}

export default Saved
