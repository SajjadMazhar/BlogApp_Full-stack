import React, { useContext } from 'react'
import blogContext from '../../context/BlogContext'
import BlogBody from '../BlogBody'
import EditBlog from './EditBlog'

const Home = () => {
  const {editing} = useContext(blogContext)
  return (
    editing?<EditBlog/>:<BlogBody/>
  )
}

export default Home
