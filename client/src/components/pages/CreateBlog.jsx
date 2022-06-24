import { Stack, TextField, Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import blogContext from '../../context/BlogContext'

const CreateBlog = () => {
    const {blogInput, setBlogInput, handleOnPostBlog} = useContext(blogContext)
    
  return (
    <Stack style={{width:"40vw"}} spacing={4}>
      <Typography variant="h4">Post...</Typography>
      <TextField
          id="outlined-textarea-title"
          label="Blog Title"
          placeholder="Give a title..."
          value={blogInput.blogTitle}
          onChange={(e)=>setBlogInput(prev=>({...prev, blogTitle:e.target.value}))}
          
        />
        <TextField
          id="outlined-textarea-blog"
          label="Blog"
          placeholder="Write your blog..."
          multiline
          rows={4}
          value={blogInput.blog}
          onChange={(e)=>setBlogInput(prev=>({...prev, blog:e.target.value}))}
          
        />
        <TextField
          id="outlined-textarea-img"
          type="file"
          style={{width:"20vw"}}
        />
        <Button variant="contained" size='large' onClick={handleOnPostBlog}>
            post
        </Button>
    </Stack>
  )
}

export default CreateBlog
