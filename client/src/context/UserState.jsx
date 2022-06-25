import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from './UserContext'

const UserState = ({children}) => {
    const [loginInput, setLoginInput] = useState({email:"", password:""});
    const [registerInput, setRegisterInput] = useState({name:"", email:"", password:""})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [otp, setOtp] = useState("")
    const [userDetails, setUserDetails] = useState({})

    const navigate = useNavigate()

    // localstorage functions
    const setToLocal = (token)=>{
        localStorage.setItem("authToken", token)
    }
    const getFromLocal = ()=>{
        return localStorage.getItem("authToken")
    }

    const handleOnSignup = async()=>{
        const resp = await fetch("/user/signup", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(registerInput)
        })
        const data = await resp.json()
        if(data.status==='created'){
            setIsLoggedIn(true)
            localStorage.setItem("authToken", data.token)
        }
    }

    const handleOnVerifyOtp = async()=>{
        const token = localStorage.getItem("authToken")
        const resp = await fetch("/user/verify", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            },
            body:JSON.stringify({otp})
        })
        const data = await resp.json()
        if(data.verified){
            navigate("/")
        }
    }

    const handleLogin = async()=>{
        const resp = await fetch("/user/signin", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(loginInput)
        })
        const userData = await resp.json()
        setToLocal(userData.token)
        setLoginInput({email:"", password:""})
        navigate("/")

    }

    const fetchUser = async()=>{
        const token = getFromLocal()
        const resp = await fetch("/user", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":"bearer "+token
            }
        })
        const userData = await resp.json()
        setUserDetails(userData)
    }

    const handleOnLogout = ()=>{
        localStorage.removeItem("authToken")
        setIsLoggedIn(false)
        navigate("/login")
    }

    const values={
        loginInput,
        setLoginInput,
        handleLogin,
        getFromLocal,
        handleOnLogout,
        isLoggedIn,
        setIsLoggedIn,
        registerInput, 
        setRegisterInput,
        handleOnSignup,
        otp,
        setOtp,
        handleOnVerifyOtp,
        navigate,
        userDetails,
        fetchUser
    }
  return (
    <userContext.Provider value={values}>
        {children}
    </userContext.Provider>
  )
}

export default UserState
