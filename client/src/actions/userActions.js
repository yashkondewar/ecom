import {USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST,
    LOAD_SUCCESS, LOAD_FAIL, LOAD_REQUEST,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_FAIL,
    ClearErrors,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL} from "../constants/userConstants"
import axios from "axios";

export const login = (email, password) => async (dispatch) =>{
    try {
        dispatch({type: USER_LOGIN_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            '/api/v1/loginuser',
            {email, password},
            config
        )

        dispatch({type: USER_LOGIN_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error.response.data.message})
    }
}

export const register = (userData) => async (dispatch) =>{
    try {
        dispatch({type: USER_REGISTER_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            '/api/v1/register',
            userData,
            config
        )

        dispatch({type: USER_REGISTER_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.response.data.message})
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_REQUEST});

        const {data} = await axios.get(
            '/api/v1/profile'
        )

        dispatch({type: LOAD_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: LOAD_FAIL, payload: error.response.data.message})
    }
}

export const logout = () => async(dispatch) => {
    try {
        await axios.get('api/v1/logout')
        dispatch({type: LOGOUT_SUCCESS})

    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.response.data.message})
    }
}


export const updateProfile = (userData) => async (dispatch) =>{
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.put(
            '/api/v1/profile/update',
            userData,
            config
        )

        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});

    } catch (error) {
        dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response.data.message})
    }
}


export const updatePassword = (passwords) => async (dispatch) =>{
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.put(
            '/api/v1/changepassword',
            passwords,
            config
        )

        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});

    } catch (error) {
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message})
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/users`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };

  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
      const { data } = await axios.delete(`/api/v1/admin/users/${id}`);
      dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
    }
  };

export const clearErrors = () => async (dispatch) => {
    dispatch({type: ClearErrors})
}