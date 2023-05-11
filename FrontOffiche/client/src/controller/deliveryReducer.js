import { DELIVERYMODIFY, GETDELIVERYADDRESS } from "./type";

const initialStore = {
    delivery: [],
  }
  export const deliveryReducer = (state = initialStore, action) => {
    switch (action.type) {
        case GETDELIVERYADDRESS:           
        return {
            ...state,
            delivery: action.payload,
          }
        case DELIVERYMODIFY:
          state.delivery.frais=action.payload
          return{
            ...state,
            delivery:[...state.delivery]
          }
    
        default:
            return state;
    }
  }
