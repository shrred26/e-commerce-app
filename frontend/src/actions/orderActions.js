import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from '../constants/orderContants'
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