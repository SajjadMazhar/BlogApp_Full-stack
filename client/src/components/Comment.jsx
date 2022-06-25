import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useContext } from 'react'
import blogContext from '../context/BlogContext'

const Comment = () => {
  return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
  )
}

export default Comment
