import React from 'react'
import { Redirect } from 'react-router-dom'

const FarmerRouter = ({user, children}) =>{
   if(!user.isConnected){
     return <Redirect to="/login" replace/> 
   }else{
      if(user.role !== "FARMER"){
        return <Redirect to="/noaccess" replace/> 
      }
   }
   return children
}

export default FarmerRouter