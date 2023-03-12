import React, { useEffect } from "react"
import { Header } from "../common/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "../home/Home"
import { Footer } from "../common/Footer"
import { Details } from "../home/details/Details"
import Login from "../compte/Login"
import Register from "../compte/Register"
import PrivateRouter from "../compte/PrivateRouter"
import { setUser } from "../../controller/authActions"
import Profile from "../compte/Profile"
import { useSelector } from "react-redux"
import ForceRedirect from "../../controller/ForceRedirect"

import FarmerRouter from "../compte/FarmerRouter"
import Farmer from "../compte/Farmer"
import ProfilePage from "../compte/Compte"





export const Pages = ({ cartItems }) => {
  const auth=useSelector(state=>state.auth)
  const user={
    isConnected: auth.isConnected,
    role: auth.user.role,
    name: auth.user.name
  }
  return (
    <>

      <Router>
      
        <Header user={user.role} name={user.name} />
        <Switch>
        <Route path="/farmer">
          <FarmerRouter user={user}>
            <Farmer />
          </FarmerRouter>
          </Route>
          <Route exact path='/'>
            <Home cartItems={cartItems} />
          </Route>
          <Route exact path='/cart/:id'>
           <Details />
          </Route>

          <Route path="/login" >
          <ForceRedirect user={user}>
            <Login />
          </ForceRedirect>
          </Route>

          <Route path='/register'>
          <ForceRedirect user={user}>
            <Register />
          </ForceRedirect>
          </Route>

          <Route  path='/profile'>
           <PrivateRouter user={user}>
            <Profile/>
            </PrivateRouter>  
          </Route> 
        </Switch>
        
        <Footer />
      </Router>
    </>
  )
}
