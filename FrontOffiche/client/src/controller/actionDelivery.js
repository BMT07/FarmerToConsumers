import { DELIVERYMODIFY, GETDELIVERYADDRESS } from "./type"

export const GET_DELIVERY_ADDRESS = (item) => {
    return {
      type: GETDELIVERYADDRESS,
      payload: item,
    }
  }
export const DELIVER_YMODIFY = (item) => {
    return {
      type: DELIVERYMODIFY,
      payload: item,
    }
  }