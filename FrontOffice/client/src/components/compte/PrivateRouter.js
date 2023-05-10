import React from 'react'
import { Redirect} from 'react-router-dom'

function PrivateRouter({user,children}) {
    if(!user.isConnected){
  return <Redirect to="/login" replace/>
}
return children
}

export default PrivateRouter