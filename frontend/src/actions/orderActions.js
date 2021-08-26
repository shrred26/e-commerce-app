import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_LIST_SUCCESS,
    ORDER_LIST_REQUEST, ORDER_LIST_FAIL
} from '../constants/orderContants'
import { fetchJSONData } from './../network';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const resp = await fetchJSONData(`http://localhost:8080/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(order)
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: resp });
    } catch (e) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: e.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const resp = await fetchJSONData(`http://localhost:8080/api/orders/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: resp });
    } catch (e) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: e.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const resp = await fetchJSONData(`http://localhost:8080/api/orders/${orderId}/pay`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(paymentResult)
        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: resp });
    } catch (e) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: e.message
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const resp = await fetchJSONData('http://localhost:8080/api/orders/myorders', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: ORDER_LIST_SUCCESS, payload: resp });
    } catch (e) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: e.message
        })
    }
}