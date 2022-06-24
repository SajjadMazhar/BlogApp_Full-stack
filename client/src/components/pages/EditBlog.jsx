import { Button, Stack, TextField } from '@mui/material'
import React, { useContext } from 'react'
import blogContext from '../../context/BlogContext'

const EditBlog = () => {
  const {editBlogInput, setEditBlogInput, handleOnUpdate} = useContext(blogContext)
  return (
    <Stack style={{width:"40vw"}} spacing={4}>
      <TextField
          id="outlined-textarea-titleedit"
          label="Edit your Blog Title"
          placeholder="Give a title..."
          value={editBlogInput.blogTitle}
          onChange={(e)=>setEditBlogInput(prev=>({...prev, blogTitle:e.target.value}))}
        />

        <TextField
          id="outlined-textarea-blogedit"
          label="Blog"
          placeholder="Edit your blog..."
          multiline
          rows={4}
          value={editBlogInput.blog}
        onChange={(e)=>setEditBlogInput(prev=>({...prev, blog:e.target.value}))}
        />

        <Button variant="contained" size='large' onClick={()=>handleOnUpdate()}>
            update
        </Button>
    </Stack>
  )
}

export default EditBlog
