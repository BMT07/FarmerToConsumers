import { GoogleOAuthProvider } from "@react-oauth/google"
import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import { Provider } from "react-redux"
import store from "./controller/store"
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const root = ReactDOM.createRoot(document.getElementById("root"))
const persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="865047051991-recgrbpalpcg7d87bmeejtdjrab0nrpq.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
)
