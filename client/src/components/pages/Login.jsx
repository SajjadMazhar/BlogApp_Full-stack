import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../../context/UserContext'

const Login = () => {
    const {loginInput, setLoginInput, handleLogin} = useContext(userContext)
  return (
   <Box component="form" 
        style={{
            height: "25rem",
            width: "30vw",
            display: "flex",
            flexDirection:" column",
            justifyContent:"center",
            gap:"2rem"
        }}
   >
    <Typography variant='h4' style={{textAlign:"center"}}>
        Login
    </Typography>
    
         <TextField
          id="outlined-textarea-email"
          label="Email"
          placeholder="Enter your email..."
          type="email"
          value={loginInput.email}
          onChange={(e)=> setLoginInput(prev=> ({...prev, email:e.target.value}))}
        />
        <TextField
          id="outlined-textarea-pass"
          label="Password"
          placeholder="Enter your passoword..."
          type="password"
          value={loginInput.password}
          onChange={(e)=> setLoginInput(prev=> ({...prev, password:e.target.value}))}
        />
        <Link style={{fontSize:"12px"}} to="/signup">don't have an account?</Link>
        <Button variant="contained" size='large' onClick={handleLogin}>
            LOGIN
        </Button>
   </Box>
  )
}

export default Login
