import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {
  Routes, Route, Link
} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import userContext from '../context/UserContext';
import blogContext from '../context/BlogContext';
import SignUp from './pages/SignUp';
import Saved from './pages/Saved';
import MyBlogs from './pages/MyBlogs';

const drawerWidth = 240;

export default function ClippedDrawer() {
  const {handleOnLogout, isLoggedIn} = React.useContext(userContext)
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          TechBook
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[['Blogs', '/', <DynamicFeedIcon />], ['Post Blog', '/newblog', <PostAddIcon />], ['Your Blogs', '/yblogs', <InboxIcon />], ['Saved', '/saved', <StarOutlineIcon />]].map((text) => (
            <Link to={text[1]} key={text[0]} style={{textDecoration:"none", color:"#666666"}}>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text[2]}
                  </ListItemIcon>
                  <ListItemText primary={text[0]} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {[['Profile','/profile', <AccountCircleIcon/>], ['Trash', '/trash', <FolderDeleteIcon/>]].map((text) => (
            <Link to={text[1]} key={text[0]} style={{textDecoration:"none", color:"#666666"}}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text[2]}
                  </ListItemIcon>
                  <ListItemText primary={text[0]} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <ListItem disablePadding onClick={handleOnLogout}>
            {
              isLoggedIn?
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>:
                <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            }

          </ListItem>
        </List>
      </Box>
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <div className="App">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/newblog" element={<CreateBlog/>} />
                <Route path="/saved" element={<Saved/>} />
                <Route path="/yblogs" element={<MyBlogs/>} />
              </Routes>
      </div>
    </Box>
  </Box>    
  );
}
