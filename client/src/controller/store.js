import { applyMiddleware, createStore } from "redux"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducers from "./main";

const initialState = {};
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer']
};
const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [thunk];

const store = createStore(
  persistedReducer, // pass persistedReducer as the third argument
  initialState,
  applyMiddleware(...middleware)
);


export default store;
