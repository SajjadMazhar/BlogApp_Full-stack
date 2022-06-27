import React, { useContext } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import userContext from '../../context/UserContext'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const {isLoggedIn, registerInput, setRegisterInput, handleOnSignup, handleOnVerifyOtp, otp, setOtp} = useContext(userContext)
  return (
    <Box component="form" 
        style={{
            height: "25rem",
            width: "30vw",
            display: "flex",
            flexDirection:" column",
            justifyContent:"center",
            marginTop:"5rem",
            marginBottom:"10rem",
            gap:"2rem"
        }}
   >
    <Typography variant='h4' style={{textAlign:"center"}}>
        Register
    </Typography>
        {
            isLoggedIn?
            <>
                <TextField
                id="outlined-textarea-email"
                label="OTP"
                placeholder="Enter the OTP..."
                type="text"
                value={otp}
                onChange={(e)=> setOtp(e.target.value)}
                />
                <Button variant="contained" size='large' onClick={handleOnVerifyOtp}>
                    Verify
                </Button>
            </>
            :
            <>
                <TextField
                id="outlined-textarea-email"
                label="Name"
                placeholder="Enter your Name..."
                value={registerInput.name}
                onChange={(e)=> setRegisterInput(prev=> ({...prev, name:e.target.value}))}
                />
                <TextField
                id="outlined-textarea-pass"
                label="Email"
                placeholder="Enter your Email..."
                type="email"
                value={registerInput.email}
                onChange={(e)=> setRegisterInput(prev=> ({...prev, email:e.target.value}))}
                />
                <TextField
                id="outlined-textarea-pass"
                label="Password"
                placeholder="Enter your passoword..."
                type="password"
                value={registerInput.password}
                onChange={(e)=> setRegisterInput(prev=> ({...prev, password:e.target.value}))}
                />
                <label>Upload your profile</label>
                <TextField
                type="file"
                onChange={(e)=> setRegisterInput(prev=> ({...prev, dp:e.target.files[0]}))}
                />
                
                <Link style={{fontSize:"12px"}} to="/login">Already have an account?</Link>
                <Button variant="contained" size='large' onClick={handleOnSignup}>
                    Signup
                </Button>
            </>
        }
   </Box>
  )
}

export default SignUp
