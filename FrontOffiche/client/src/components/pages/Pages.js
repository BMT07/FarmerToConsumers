import React, { useEffect } from 'react';
import { Header } from '../common/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from '../home/Home';
import { Details } from '../home/details/Details';
import Login from '../compte/Login';
import Shop from '../shop/Shop';
import Register from '../compte/Register';
import PrivateRouter from '../compte/PrivateRouter';
import { Logout, setUser } from '../../controller/authActions';
import Profile from '../compte/Profile';
import { useDispatch, useSelector } from 'react-redux';
import ForceRedirect from '../../controller/ForceRedirect';
import jwt_decode from 'jwt-decode';

import FarmerRouter from '../compte/FarmerRouter';
import Farmer from '../compte/Farmer';
import ForgetPassword from '../compte/forgetPassword';
import { setAuth } from '../../util/setAuth';
import store from '../../controller/store';
import ActivationEmail from '../compte/ActivationEmail';
import { fetchProducts } from '../../controller/ProductAction';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import ContactUs from './ContactUs';
import Checkout from '../Order/Checkout';
import Cart from '../home/Cart/Cart';
import SuccessPayment from '../Order/SuccessPayment';
import FailedPayment from '../Order/FailedPayment';
import Chat from '../compte/Chat/Chat';
import AboutUs from '../Aboutus/Aboutus';
import Chatbot from '../home/chatbot/Chatbot';
import Calendar from '../Calendar/Calendar';
import ChatBotIndex from '../home/chatbot/ChatBotIndex';
import CropRecommender from '../AiRecommandation/CropRecommender';
import FertilizerRecommender from '../AiRecommandation/FertilizerRecommender';
import IndexFer from '../AiRecommandation/IndexFer';
//import AboutUs from '../Test/AboutUs/index';


const channel = new BroadcastChannel('auth');




if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt)
  store.dispatch(setUser(decode))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now() / 1000

  if (decode.exp <= currentDate) {
    store.dispatch(Logout())
    window.location.href = '/login'
  }
  else {
    // Rediriger automatiquement l'utilisateur lorsque le jeton expire
    const expiresIn = (decode.exp - currentDate) * 1000
    setTimeout(() => {
      store.dispatch(Logout())
      channel.postMessage('logout');
      window.location.href = '/login'
    }, expiresIn)
  }
}
channel.addEventListener('message', (event) => {
  if (event.data === 'logout') {
    store.dispatch(Logout())
    window.location.href = '/login'
  }
});
export const Pages = ({ cartItems }) => {

  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
    name: auth.user.name,
  };

  const selectedChat = useSelector((state) => state.selectedChat);

  return (
    <>
      <Router>
        {/* <NavBar user={user.role} /> */}
        <Header user={user.role} name={user.name} />
        {/* <ChatBotIndex/> */}
        <Switch>
          <Route exact path="/farmer">
            <FarmerRouter user={user}>
              <Farmer />
            </FarmerRouter>
          </Route>  
          <Route path="/farmer/calendar" >
            <Calendar />
          </Route>    
          <Route path="/aboutus">
              <AboutUs />
          </Route>
          <Route path="/chat">
            <PrivateRouter user={user}>
              <Chat />
            </PrivateRouter>
          </Route>
          <Route exact path="/">
            <Home cartItems={cartItems} />
          </Route>
          <Route exact path="/ContactUs">
            <ContactUs />
          </Route>
          <Route path={"/shop"} >
            <Shop />
          </Route>
          <Route path="/cartEdit" exact component={Cart} />
          <Route path="/cartEdit/checkout" >
            <PrivateRouter user={user}>
              <Checkout />
            </PrivateRouter>
          </Route>
          <Route exact path="/cart/:id">
            <Details />
          </Route>
          {/* <Route path="/chatbot" >
            <Chatbot />
          </Route> */}
          <Route path="/success">
            <PrivateRouter user={user}>
              <SuccessPayment />
            </PrivateRouter>
          </Route>
          <Route path="/failed">
            <PrivateRouter user={user}>
              <FailedPayment />
            </PrivateRouter>
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
          <Route path="/farmer/crop">
            <CropRecommender />
          </Route>
          <Route path="/farmer/fertilizer">
            <IndexFer />
          </Route>

        </Switch>

        <Footer />
      </Router>
    </>
  );
};
