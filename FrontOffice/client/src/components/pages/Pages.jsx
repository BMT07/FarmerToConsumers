import React, { useEffect } from 'react';
import { Header } from '../common/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from '../home/Home';
import { Footer } from '../common/Footer';
import { Details } from '../home/details/Details';
import Login from '../compte/Login';
import Register from '../compte/Register';
import PrivateRouter from '../compte/PrivateRouter';
import { Logout, setUser } from '../../controller/authActions';
import Profile from '../compte/Profile';
import { useSelector } from 'react-redux';
import ForceRedirect from '../../controller/ForceRedirect';
import jwt_decode from 'jwt-decode';

import FarmerRouter from '../compte/FarmerRouter';
import Farmer from '../compte/Farmer';
import ForgetPassword from '../compte/forgetPassword';
import { setAuth } from '../../util/setAuth';
import store from '../../controller/store';
import ActivationEmail from '../compte/ActivationEmail';

if(window.localStorage.jwt){
  const decode = jwt_decode(window.localStorage.jwt)
  store.dispatch(setUser(decode))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now() / 1000

  if(decode.exp <=  currentDate){
   store.dispatch(Logout()) 
   window.location.href = '/login'
  }
}
export const Pages = ({ cartItems }) => {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
    name: auth.user.name,
  };

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
          <Route exact path="/">
            <Home cartItems={cartItems} />
          </Route>
          <Route exact path="/cart/:id">
            <Details />
          </Route>

          <Route path="/login">
            <ForceRedirect user={user}>
              <Login />
            </ForceRedirect>
          </Route>

          <Route path="/register">
            <ForceRedirect user={user}>
              <Register />
            </ForceRedirect>
          </Route>

          <Route path="/profile">
            <PrivateRouter user={user}>
              <Profile />
            </PrivateRouter>
          </Route>
          <Route path="/forget">
            <ForgetPassword />
          </Route>
          <Route path="/activationemail/:activation_token">
            <ActivationEmail />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>
  );
};
