import React, { useEffect } from "react"
import { Pages } from "./components/pages/Pages"
import "./style/main.scss"
import Chatbot from "./components/Chatbot/Chatbot"


export const App = () => { 
  return (
    <>
    <Chatbot />
      <Pages />

    </>
  )
}
