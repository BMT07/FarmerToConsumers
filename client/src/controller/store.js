import { applyMiddleware, createStore } from "redux"
import Middleware from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from "./main"

const initialState={}
const store = createStore(
    reducers,
    initialState, 
    composeWithDevTools(applyMiddleware(Middleware)))
export default store
