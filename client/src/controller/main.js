import { combineReducers } from "redux"
import { cartReducer } from "./reducer"
import authReducer from './authReducer'
import errorsReducer from './errorsReducer'
import productReducer from './ProductReducer'
import { deliveryReducer } from './deliveryReducer'
import chatReducer from "./chatReducer"

const reducers = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  cartReducer,
  productReducer,
  delivery: deliveryReducer,
  chat: chatReducer
})

export default reducers
