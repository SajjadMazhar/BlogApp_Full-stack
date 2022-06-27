import { Avatar, Button, ButtonGroup, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import blogContext from '../context/BlogContext'

const Comment = ({comment}) => {
  return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" />
        </ListItemAvatar>
        <ListItemText
          primary={comment.userName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.comment}
              </Typography>
              <br/>
              {new Date(comment.createdAt).toDateString()}

            </React.Fragment>
          }
        />
          <Stack style={{float:"right"}}>
            <Button variant="outlined" style={{width:"76px", height:"35px", fontSize:"12px"}}>delete</Button>
          </Stack>
      </ListItem>
  )
}

export default Comment
