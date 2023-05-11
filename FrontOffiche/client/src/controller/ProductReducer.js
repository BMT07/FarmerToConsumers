import { FETCH_PRODUCT_SUCCESS, GETPROD, LIKEPROD, UNLIKEPROD } from "./type";

const initialState={
    Product: []
}
export default function(state= initialState,action){
    switch (action.type){
        case GETPROD:
            return {
                ...state,
                Product: action.payload 
            }

        default:
            return state
    }
}