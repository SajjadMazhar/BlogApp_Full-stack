import React from 'react'
import userContext from './UserContext'

const UserState = ({children}) => {
    

    const values={

    }
  return (
    <userContext.Provider value={values}>
        {children}
    </userContext.Provider>
  )
}

export default UserState
