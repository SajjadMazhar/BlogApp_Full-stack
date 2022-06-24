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
  const { reactOnBlog, toggleEditing, deleteBlog} = React.useContext(blogContext)


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 525}} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <>
          <IconButton aria-label="delete" onClick={()=>deleteBlog(blog.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={()=>toggleEditing(blog.id)}>
            <EditIcon />
          </IconButton>
          </>
        }
        title={blog.user.name}
        subheader={new Date(blog.updatedAt).toDateString()}
      />
      <CardMedia
        component="img"
        height="374"
        image="https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg?w=2000"
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
          {/* <Typography> */}
          {/* {blog.content} */}
          <input/>
          {/* </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}
