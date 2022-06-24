import React, { useState } from 'react'
import userContext from './UserContext'

const UserState = ({children}) => {
    const [loginInput, setLoginInput] = useState({email:"", password:""})

    // localstorage functions
    const setToLocal = (token)=>{
        localStorage.setItem("authToken", token)
    }
    const getFromLocal = ()=>{
        return localStorage.getItem("authToken")
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

    }

    const values={
        loginInput,
        setLoginInput,
        handleLogin,
        getFromLocal
    }
  return (
    <userContext.Provider value={values}>
        {children}
    </userContext.Provider>
  )
}

export default UserState
