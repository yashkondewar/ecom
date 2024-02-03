import axios from "axios";
import { ALL_PROD_FAIL, ALL_PROD_REQUEST, ALL_PROD_SUCCESS,
         PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
         NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_RESET, NEW_REVIEW_FAIL,
         ClearErrors, 
         NEW_PRODUCT_REQUEST,
         NEW_PRODUCT_SUCCESS,
         NEW_PRODUCT_FAIL,
         UPDATE_PRODUCT_REQUEST,
         UPDATE_PRODUCT_SUCCESS,
         UPDATE_PRODUCT_FAIL,
         DELETE_PRODUCT_REQUEST,
         DELETE_PRODUCT_SUCCESS,
         DELETE_PRODUCT_FAIL} from "../constants/productConstants";


export const getProduct = (keyword="", currentPage=1, min=0, max=50000, category, ratings=0) => async (dispatch) =>{
    try {
        dispatch({
            type: ALL_PROD_REQUEST,
        })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${min}&price[lte]=${max}&ratings[gte]=${ratings}`;
        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${min}&price[lte]=${max}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data} = await axios.get(link);
        // console.log(currentPage);
        // console.log(data);
        dispatch({
            type: ALL_PROD_SUCCESS,
            payload: data,
        })
        
    } catch (err) {
        dispatch({
            type: ALL_PROD_FAIL,
            payload: err.response.data.message,
        })
    }
}


export const getProductDetails = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        })

        const {data} = await axios.get(`/api/v1/product/${id}`);
        // console.log("data " + data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
          });
        
    } catch (err) {
        // console.log(err);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response.data.message,
        })
    }
}

export const newReview = (reviewData) => async (dispatch) =>{
    try {
        dispatch({
            type: NEW_REVIEW_REQUEST,
        })

        const config = {
            headers: {"Content-Type": "application/json"},
        }

        const {data} = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
          });
        
    } catch (err) {
        // console.log(err);
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: err.response.data.message,
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: ClearErrors})
}

export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Product
  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  