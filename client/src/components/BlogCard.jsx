import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import EditIcon from '@mui/icons-material/Edit';
import blogContext from '../context/BlogContext';
import userContext from '../context/UserContext';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Button, Stack, TextField } from '@mui/material';
import Comment from './Comment';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogCard({blog}) {
  const [expanded, setExpanded] = React.useState(false);
  const { reactOnBlog, toggleEditing, deleteBlog, toggleSaveBlog, commentInput, setCommentInput, handleOnComment} = React.useContext(blogContext)
  const {userDetails} = React.useContext(userContext)


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 755}} >
      <CardHeader
        avatar={
          <Avatar src={"/profiles"+blog.user.dp} sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* {blog.user.name.substr(0,1).toUpperCase()} */}
            
          </Avatar>
        }
        action={
          <>
          {userDetails.id === blog.userId?
          <>
          <IconButton aria-label="delete" onClick={()=>deleteBlog(blog.id, blog.userId)}>
            <DeleteIcon color="error"/>
          </IconButton>
          <IconButton aria-label="edit" onClick={()=>toggleEditing(blog.id)}>
            <EditIcon color="primary" />
          </IconButton>
          </>
          :""
          }
          {
            blog.saved?
            <IconButton aria-label="saved" onClick={()=>toggleSaveBlog(blog.id)}>
              <StarIcon color="warning" />
            </IconButton>:
            <IconButton aria-label="unsaved" onClick={()=>toggleSaveBlog(blog.id)}>
              <StarBorderIcon color="warning" />
            </IconButton>
          }
          </>
        }
        title={blog.user.name}
        subheader={new Date(blog.createdAt).toDateString()}
      />
      <CardMedia
        component="img"
        height="350"
        image={"/blogposts"+blog.images[0]}
        alt="blog_img"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{fontWeight:"bolder"} }>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{my:1}}>
          {blog.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={()=>reactOnBlog(blog.id, "liked")}>
          {blog.liked?<ThumbUpAltIcon />:<ThumbUpOffAltIcon />}
          <Typography sx={{m:1}}>{blog.likes}</Typography>
        </IconButton>
        <IconButton aria-label="dislike" onClick={()=>reactOnBlog(blog.id, "disliked")}>
        {blog.disliked?<ThumbDownAltIcon/>:<ThumbDownOffAltIcon/>}
        <Typography sx={{m:1}}>{blog.dislikes}</Typography>

        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <TextField 
              variant="filled"
              fullWidth
              label="Your Comment"
              size="small"
              value={commentInput}
              onChange={(e)=>setCommentInput(e.target.value)}
            />
            <Button variant='outlined' onClick={()=>handleOnComment(blog.id)}>Comment</Button>
          </Stack>
          <br/>
          <hr/>
          <Stack>
            {
             blog.comments&& blog.comments.map((comment, id)=>(
                <Comment comment={comment} key={id+"comment"}/>
              )) 
            }
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
