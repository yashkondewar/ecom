import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk"
import{ composeWithDevTools} from "redux-devtools-extension"
import { adminProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer } from "./reducers/productReducer";
import { adminUserReducer, allUsersReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { adminOrderReducer, allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myorders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: adminProductReducer,
    allOrders: allOrdersReducer,
    allUsers: allUsersReducer,
    order: adminOrderReducer,
    usersAdmin: adminUserReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") 
                ?   JSON.parse(localStorage.getItem("cartItems")) : [], 
        
        shippingInfo: localStorage.getItem("shippingInfo") 
        ?   JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;