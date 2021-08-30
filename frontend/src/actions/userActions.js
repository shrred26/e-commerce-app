import { ORDER_LIST_RESET } from '../constants/orderContants';
import {
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET
} from '../constants/userConstants';
import { fetchJSONData } from './../network';

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const resp = await fetchJSONData('http://localhost:8080/api/users', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: resp
        })
        localStorage.setItem('userInfo', JSON.stringify(resp));
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: resp
        })
    } catch (e) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: e.message
        })
    }

}
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const resp = await fetchJSONData('http://localhost:8080/api/users/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: resp
        })
        localStorage.setItem('userInfo', JSON.stringify(resp));
    } catch (e) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: e.message
        })
    }

}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_RESET })
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState();
        const resp = await fetchJSONData(`http://localhost:8080/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: resp
        })

    } catch (e) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: e.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const { userLogin: { userInfo } } = getState();
        const resp = await fetchJSONData(`http://localhost:8080/api/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(user)
        });
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: resp
        })

    } catch (e) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: e.message
        })
    }
}