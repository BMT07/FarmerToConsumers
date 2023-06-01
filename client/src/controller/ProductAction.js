import axios from "axios";
import { ERRORS, FETCH_PRODUCT_SUCCESS, GETPROD, LIKEPROD, UNLIKEPROD } from "./type";

export const fetchProducts = () => async (dispatch) => {
    await axios.get('http://localhost:8080/FarmerToConsumer/getProducts')
    .then((response)=>{dispatch(GET_PRODUCTS(response.data))
        console.log(response.data)})    
    .catch((error)=>dispatch({
        type: ERRORS,
        payload: error.response.data,
      }));    
    };
export const GET_PRODUCTS =(item)=> {
    return {
          type: GETPROD,
          payload: item,
        }
};
