import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstants';
import { fetchJSONData } from './../network';

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
    dispatch({
        type: USER_LOGOUT
    })
}