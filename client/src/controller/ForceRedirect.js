import React from 'react'
import {  Redirect } from 'react-router-dom'

const ForceRedirect = ({user, children}) =>{
    if(user.isConnected){
        return <Redirect to="/profile" replace/> 
      } 
      return children
}

export default ForceRedirect