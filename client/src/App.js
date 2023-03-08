import React from "react"
import { Pages } from "./components/pages/Pages"
import "./style/main.scss"
import { Provider } from "react-redux"
import store from "./controller/store"
import { Logout, setUser } from "./controller/authActions"
import jwt_decode from 'jwt-decode'
import { setAuth } from './util/setAuth';


if(window.localStorage.jwt){
  const decode = jwt_decode(window.localStorage.jwt)
  store.dispatch(setUser(decode))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now / 1000

  if(decode.exp >  currentDate){
   store.dispatch(Logout()) 
  }
}
export const App = () => {
  return (
    <>
      <Provider store={store}>
        <Pages />
      </Provider>
    </>
  )
}
