import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from './../constants/productConstants';
import { fetchJSONData } from './../network';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const data = await fetchJSONData("http://localhost:8080/api/products");
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.message
        })
    }
}