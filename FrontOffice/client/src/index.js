import { GoogleOAuthProvider } from "@react-oauth/google"
import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="865047051991-recgrbpalpcg7d87bmeejtdjrab0nrpq.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>

  </React.StrictMode>
)
