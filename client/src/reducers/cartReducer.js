 import { isObjectIdOrHexString } from "mongoose";
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

 export const cartReducer = (state = {cartItems: {}, shippingInfo:{} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isPresent = state.cartItems.find(
                (i) => i.product === item.product
            )

            if(isPresent){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                    i.product === item.product ? item : i),
                }
            }
            else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload)
            }
        
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            }
    
        default:
            return state;
    }
 }