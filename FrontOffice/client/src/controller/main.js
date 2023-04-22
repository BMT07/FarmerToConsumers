import { combineReducers } from "redux"
import { cartReducer } from "./reducer"
import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
const reducers = combineReducers({
  auth:authReducer,
  errors:errorsReducer,
  cartReducer,
})

export default reducers
