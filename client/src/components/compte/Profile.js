import React from 'react'
import { useDispatch } from 'react-redux'
import { Logout } from '../../controller/authActions'

function Profile() {
    const dispatch= useDispatch()
    const logout=()=>{
        dispatch(Logout())
    }
  return (
    <div>
        <div>Profile</div>
        <div>
            <button onClick={logout}>
                logout
            </button>
        </div>

    </div>
  )
}

export default Profile