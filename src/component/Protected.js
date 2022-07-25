import React from 'react'
import { useSelector } from 'react-redux'
import Login from '../pages/Login'
const Protected = ({children}) => {
    const user=useSelector((state)=>state.user)
    console.log(user)
  return (
      <div>
      {user.isLoggedIn ?children:<Login />}
      </div>
      
    
  )
}

export default Protected